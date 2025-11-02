const refactorNovelData = (novelInfo) => {
  let newDesc = "";
  let studios = [];
  let producers = [];
  if (novelInfo.data.Media) {
    novelInfo.data.Media.description.split("<br />").forEach((part, i) => {
      if (i % 2 === 0) {
        newDesc += `<p>${part}<p/>`;
      }
    });
    novelInfo.data.Media.description = newDesc;
  }
  novelInfo.data.Media?.studios.edges.map((studio) => {
    if (studio.node.isAnimationStudio) {
      studios.push(studio.node.name);
    } else {
      producers.push(studio.node.name);
    }
  });
  return {
    data: novelInfo.data.Media,
    studios,
    producers,
  };
};

export default refactorNovelData;
