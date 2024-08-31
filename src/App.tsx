import { Box, Button, ChakraProvider, Checkbox, Flex, Input, Text } from '@chakra-ui/react'
import './App.css'
import { useEffect, useState } from 'react'

  type Record = {
    id: number,
    title: string,
    isIncome: boolean,
    amount: number | string,
  }

function App() {
  const [records, setRecords] = useState<Record[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [amount, setAmount] = useState<string | number>("");

  useEffect(() => {
    getRecords();

    async function getRecords() {
      const response = await fetch("http://localhost:3000/records");
      const data = await response.json();
      setRecords(data);
    }
  }, []);

  const addRecord = () => {
    const newRecord = {id: records.length + 1, "title": title, "isIncome": isIncome, "amount": amount || 0};
    setRecords([...records, newRecord]);
    setTitle("");
    setIsIncome(false);
    setAmount("");
  }

  return (
    <ChakraProvider>
      <div>
        <Text fontSize={"2xl"}>家計簿アプリ</Text>
        <Box mb="8px">
          <Input placeholder="タイトルを入力" mb="4px" onChange={(e) => setTitle(e.target.value)} value={title} />
          <Input placeholder="金額を入力" mb="4px" type='number' onChange={(e) => setAmount(Number(e.target.value))} value={amount}/>
          <Flex align="center" justifyContent="space-between">
            <Checkbox w="100px" onChange={() => setIsIncome(!isIncome)} isChecked={isIncome}>入金</Checkbox>
            <Button colorScheme="blue" onClick={addRecord}>登録</Button>
          </Flex>
        </Box>
        <div>
          {records.map((data) => (
            <div key={data.id}>
              <Flex align="center" justifyContent="space-between">
                <Text>{data.title}</Text>
                <Text>{data.isIncome ? "+" : "-"}{data.amount}</Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
