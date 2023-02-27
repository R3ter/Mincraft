const getIDs = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([532, 543, 753, 1, 5]);
    }, 1500);
  });

const getRecipe = (recipeID) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      (ID) => {
        const recipe = {
          title: "Fresh tomato pasta",
          publisher: "Pinchas Hodadad",
        };
        resolve(`${ID}: ${recipe.title}`);
      },
      1500,
      recipeID
    );
  });
};

const getRes = async () => {
  console.log(await getRecipe(await getIDs()[2]));
};
getRes();
