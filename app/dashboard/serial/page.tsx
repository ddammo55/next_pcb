import { SubmitButton } from '@/app/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';


//최근시리얼번호가져오기
async function LatestSerial() {
    const latestSerial = await prisma.serial.findFirst({
        orderBy: { createdAt: 'desc' },
        //select: { value: true },
    });
    return latestSerial;
}

export default async function SerialPage() {
    const Serial = await LatestSerial();

    console.log(Serial);
    async function postData(formData: FormData){
        "use server"   

        // if(!user) { 
        //     throw new Error('Not authorized');
        // }
        
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
        const month = new Date().getMonth() + 1; // 0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10, 10:11, 11:12
        const monthKey = String.fromCharCode(64 + month); // A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9, J:10, K:11, L:12
        const count = '0002';
        const resultSerial = `${thisYear}${monthKey}${count}`;

   

    return (
       
        <form action={postData}>
            <h1>시리얼번호생성페이지</h1>
            <Input name='serial' defaultValue={Serial?.value}  />
        
            <SubmitButton/>
        </form>
    );
}

