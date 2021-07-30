import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Reader from './reader/reader';

const ReaderMain = ({ rootData }) => {
  //   const [state, setState] = useState(rootData);
  const readerCategoryJSX =
    rootData &&
    rootData.length &&
    rootData.forEach(data => {
      return <ReaderCategory categoryData={data} />;
    });

  return (
    <View>
      <Reader>
        <View>{readerCategoryJSX}</View>
      </Reader>
    </View>
  );
};

export default ReaderMain;

const styles = StyleSheet.create({});
