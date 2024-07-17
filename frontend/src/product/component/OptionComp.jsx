import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const OptionComp = (props) => {
  const [options, setOptions] = useState([]);

  const handleOptionChange = (value) => {
    if (options.includes(value)) {
      setOptions(options.filter((item) => item !== value));
    } else {
      setOptions([...options, value]);
    }
  };

  useEffect(() => {
    props.options(options);
  }, [options]);

  return (
    <FormControl>
      <FormLabel>옵션 선택</FormLabel>
      <CheckboxGroup colorScheme={"yellow"}>
        <Stack spacing={3} direction="row" flexWrap="wrap">
          <Checkbox onChange={() => handleOptionChange(1)}>
            개인 텀블러 사용
          </Checkbox>
          <Checkbox onChange={() => handleOptionChange(2)}>
            퐁 시리얼 선택
          </Checkbox>
          <Checkbox onChange={() => handleOptionChange(3)}>휘핑 선택</Checkbox>
          <Checkbox onChange={() => handleOptionChange(4)}>
            시나몬 선택
          </Checkbox>
          <Checkbox onChange={() => handleOptionChange(5)}>샷 선택</Checkbox>
          <Checkbox onChange={() => handleOptionChange(6)}>
            논-커피 샷 선택
          </Checkbox>
          <Checkbox onChange={() => handleOptionChange(7)}>
            디카페인 샷 선택
          </Checkbox>
          <Checkbox onChange={() => handleOptionChange(8)}>
            건강 옵션 변경
          </Checkbox>
          <Checkbox onChange={() => handleOptionChange(9)}>
            제로 사이다 변경
          </Checkbox>
          <Checkbox onChange={() => handleOptionChange(10)}>당도 선택</Checkbox>
          <Checkbox onChange={() => handleOptionChange(11)}>펄 추가</Checkbox>
          <Checkbox onChange={() => handleOptionChange(12)}>토핑 선택</Checkbox>
          <Checkbox onChange={() => handleOptionChange(13)}>
            기본 제공 잼 선택
          </Checkbox>
          <Checkbox onChange={() => handleOptionChange(14)}>잼 추가</Checkbox>
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
};
