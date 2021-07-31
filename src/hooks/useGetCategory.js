export const useGetCategory = () => {
    // rootCategory example
  // {
  //   "id": 6,
  //   "title": "CRIME", -> render
  //   "subTitle": "Criminal Story\nmissing, murder...", -> render
  //   "chapterLimit": 10,
  //   "maxLength": 500,
  //   "img": null, -> render as a uri
  //   "chapter": [] -> referenced by next chapters
  // },
  const {
    item: rootCategories,
    isLoading,
    error,
  } = CategoryService.useGET_getCategory();

  if (error) {
    return (
      <View>
        <Text>로드 중 에러!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};
