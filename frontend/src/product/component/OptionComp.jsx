import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

export const OptionComp = (props) => {
  const [options, setOptions] = useState([]);
  const initialRender = useRef(true);

  const handleOptionChange = (value) => {
    setOptions((prevOptions) =>
      prevOptions.includes(value)
        ? prevOptions.filter((item) => item !== value)
        : [...prevOptions, value],
    );
  };

  useEffect(() => {
    if (props.option) {
      // props.option을 options에 복사
      setOptions(props.option);
    }
  }, [props.option]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      props.options(options);
    }
  }, [options]);

  const isChecked = (value) => {
    return options.includes(value);
  };

  return (
    <FormControl>
      <FormLabel>퍼스널 옵션</FormLabel>
      <CheckboxGroup colorScheme={"gray"}>
        <Stack spacing={3} direction="row" flexWrap="wrap">
          <Checkbox
            onChange={() => handleOptionChange(1)}
            isChecked={isChecked(1)}
          >
            개인 텀블러 사용
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(2)}
            isChecked={isChecked(2)}
          >
            퐁 시리얼 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(3)}
            isChecked={isChecked(3)}
          >
            휘핑 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(4)}
            isChecked={isChecked(4)}
          >
            시나몬 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(5)}
            isChecked={isChecked(5)}
          >
            샷 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(6)}
            isChecked={isChecked(6)}
          >
            논-커피 샷 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(7)}
            isChecked={isChecked(7)}
          >
            디카페인 샷 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(8)}
            isChecked={isChecked(8)}
          >
            건강 옵션 변경
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(9)}
            isChecked={isChecked(9)}
          >
            제로 사이다 변경
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(10)}
            isChecked={isChecked(10)}
          >
            당도 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(11)}
            isChecked={isChecked(11)}
          >
            펄 추가
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(12)}
            isChecked={isChecked(12)}
          >
            토핑 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(13)}
            isChecked={isChecked(13)}
          >
            기본 제공 잼 선택
          </Checkbox>
          <Checkbox
            onChange={() => handleOptionChange(14)}
            isChecked={isChecked(14)}
          >
            잼 추가
          </Checkbox>
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
};
