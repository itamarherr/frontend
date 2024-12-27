 export const calculateTotalPrice = (consultancyType, numberOfTrees, isPrivate) => {
    let basePrice = 1000;
    if (consultancyType === "BeforeConstruction") basePrice = basePrice;
    if (consultancyType === "Dislocations") basePrice = 1500;
    if (consultancyType === "TreesIllness") basePrice = 1800;

    let treeMultiplier = 1.0;
    if (numberOfTrees > 1 && numberOfTrees <= 5) treeMultiplier = 1.2;
    if (numberOfTrees > 5 && numberOfTrees <= 10) treeMultiplier = 1.3;
    if (numberOfTrees > 10) treeMultiplier = 1.5;

    const privateAreaMultiplier = isPrivate ? 1.0 : 1.2;

    return basePrice * treeMultiplier * privateAreaMultiplier;
  }