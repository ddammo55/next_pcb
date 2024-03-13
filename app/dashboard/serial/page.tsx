import { SubmitButton } from '@/app/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';




export default async function SerialPage() {


   //console.log(Serial?.value);
    async function postData(formData: FormData){
        "use server"   
        
        //수량
        const quantity = formData.get('quantity') as string;
        //console.log(quantity);

        // 최근 시리얼 번호 조회
        const latestSerial = await prisma.serial.findFirst({
            orderBy: { createdAt: 'desc' },
        });

        console.log(latestSerial?.value);

        let lastNumber = latestSerial ? parseInt(latestSerial.value.slice(-4)) : 0;
        const parsedQuantity = parseInt(quantity, 10);

        // 새 시리얼 번호들 생성 및 데이터베이스에 저장
        for (let i = 1; i <= parsedQuantity; i++) {
            lastNumber++;
            const newSerialValue = `SN-${('0000' + lastNumber).slice(-4)}`; // 'SN-XXXX' 형태
            await prisma.serial.create({
                data: {
                    value: newSerialValue,
                },
            });
        }



        const title = formData.get('serial') as string;
        //const description = formData.get('description') as string;

        await prisma.serial.create({
            data: {      
                value: title,
            }
        });

        return redirect('/dashboard');
    }

  
        //console.log(latest);
        
        const thisYear = new Date().getFullYear().toString().slice(-2); // 2022 -> 22
        const latestSerial = await prisma.serial.findFirst({
            orderBy: { createdAt: 'desc' },
        });

        return (
           
            <form className='flex flex-col gap-y-5' action={postData}>
                <h1 className='mb-5'>시리얼번호생성페이지</h1>
                시작시리얼번호 : <Input name='serial' defaultValue={latestSerial?.value}  />
                수량: <Input name='quantity' type='number'  />
                <SubmitButton/>
            </form>
        );
}

