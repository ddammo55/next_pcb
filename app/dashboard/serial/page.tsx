import { StripePortal, SubmitButton } from '@/app/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LatestSerial from '@/app/components/LatestSerial';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export default async function SerialPage() {

            const boardNames = await prisma.boardName.findMany();
            

            // 최근 시리얼 번호 조회
            const latestSerial = await prisma.serial.findFirst({
                orderBy: { id: 'desc' },
            });
    
            //console.log(latestSerial?.serial);
            
            let lastNumber = latestSerial ? parseInt(latestSerial.serial.slice(3)) : 0;
           
    
            // 마지막 시리얼 번호를 정수로 변환 후 1을 더함
        let nextSerialNumber = latestSerial ? parseInt(latestSerial.serial.slice(-4)) + 1 : 1;
        // 새 시리얼 번호를 생성 (예: "001" -> "002")
        let nextSerial = `${latestSerial?.serial?.slice(0, -4)}${('0000' + nextSerialNumber).slice(-4)}`;
    
    
    async function postData(formData: FormData) {
        "use server"
        
        const boardName = formData.get('boardName') as string;
        const quantity = formData.get('quantity') as string;
        const parsedQuantity = parseInt(quantity, 10);
        // 현재 년도의 마지막 두 자리 가져오기
        const year = new Date().getFullYear().toString().slice(-2);
        
        //new Date(now.getTime() + (9 * 60 * 60 * 1000));
        // 현재 월을 문자로 변환 (1월 = A, 2월 = B, ..., 12월 = L)
        const month = String.fromCharCode(65 + new Date().getMonth()); // 0 = A, 1 = B, ..., 11 = L
        


       //console.log(nextSerial); 
        
        // 새 시리얼 번호들 생성 및 데이터베이스에 저장
        for (let i = 1; i <= parsedQuantity; i++) {
            lastNumber++; // 다음 번호로 업데이트
            const newSerialValue = `${year}${month}${('0000' + lastNumber).slice(-4)}`; // 새 시리얼 번호 생성
            //console.log(newSerialValue);
            await prisma.serial.create({
                data: {
                    serial: newSerialValue,
                    boardName: boardName,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        }
        

        // 처리 완료 후 대시보드로 리디렉션
        return redirect('/dashboard/serial');
        
    }



        return (
                <div className='grid items-start gap-8'>
                    <div className='flex items-center justify-between px-2 '>
                        <div className='grid gap-1'>
                            <h1 className='text-3xl md:text-4xl'>시리얼번호 생성페이지</h1>
                            <p className='text-lg text-muted-foreground'>SMT생산시 생산보드의 시리얼번호를 생성해주세요</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="">
                            <Card className="w-full">
                            <CardContent>
                                <form className='flex flex-col gap-y-5 mt-5' action={postData}>
                                보드명 :
                                    <Select name="boardName" required>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="보드명을 선택해주세요"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {boardNames.map((name, index) => (
                                            <SelectItem key={index} value={name.boardName}>{name.boardName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    시작시리얼번호 :
                                    <Input
                                        className='w-[180px]'
                                        name='serial'
                                        defaultValue={nextSerial}
                                        disabled/>
                                    수량:
                                    <Input className='w-[180px]' name='quantity' type='number'/>
                                    <SubmitButton title="시리얼번호만들기"/>
                                </form>
                                </CardContent>
                            </Card>

                        </div>

                        <div className="">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>최근 생성된 시리얼번호</CardTitle>
                                    <CardDescription>
                                        최근 생성된 시리얼번호를 확인하세요
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <LatestSerial/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>
        );
}

