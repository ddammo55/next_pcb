import { SubmitButton } from '@/app/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Swal.fire("SweetAlert2 is working!");

export default async function SerialPage() {
    
    const MySwal = withReactContent(Swal)
   

    async function postData(formData: FormData) {
        "use server"
        const boardName = formData.get('boardName') as string;
        const quantity = formData.get('quantity') as string;
        
        // 현재 년도의 마지막 두 자리 가져오기
        const year = new Date().getFullYear().toString().slice(-2);
        
        //new Date(now.getTime() + (9 * 60 * 60 * 1000));
        // 현재 월을 문자로 변환 (1월 = A, 2월 = B, ..., 12월 = L)
        const month = String.fromCharCode(65 + new Date().getMonth()); // 0 = A, 1 = B, ..., 11 = L
        
        // 최근 시리얼 번호 조회
        const latestSerial = await prisma.serial.findFirst({
            orderBy: { id: 'desc' },
        });

        console.log(latestSerial?.serial);
        
        let lastNumber = latestSerial ? parseInt(latestSerial.serial.slice(3)) : 0;
        const parsedQuantity = parseInt(quantity, 10);


        
        // 새 시리얼 번호들 생성 및 데이터베이스에 저장
        for (let i = 1; i <= parsedQuantity; i++) {
            lastNumber++; // 다음 번호로 업데이트
            const newSerialValue = `${year}${month}${('0000' + lastNumber).slice(-4)}`; // 새 시리얼 번호 생성
            console.log(newSerialValue);
            await prisma.serial.create({
                data: {
                    serial: newSerialValue,
                    boardName: boardName,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        }
        
        MySwal.fire({   
            title: '생성완료',
            text: '시리얼번호가 생성되었습니다.',
            icon: 'success',
            confirmButtonText: '확인'
        })
        // 처리 완료 후 대시보드로 리디렉션
        return redirect('/dashboard/serial');
        
    }

        // 최근 시리얼 번호 조회
        const latestSerial = await prisma.serial.findFirst({
            orderBy: { id: 'desc' },
        });

        return (
           
            <form className='flex flex-col gap-y-5' action={postData}>
                <select name="boardName" id="boardName" required>
                    <option value="board1">Board 1</option>
                    <option value="board2">Board 2</option>
                    {/* Add more board options here */}
                </select>

                <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
                </Select>
                <h1 className='mb-5'>시리얼번호생성페이지</h1>
                시작시리얼번호 : <Input name='serial' value={latestSerial?.serial} disabled  />
                수량: <Input name='quantity' type='number'  />
                <SubmitButton title="시리얼번호만들기"/>
              
            </form>
        );
}

