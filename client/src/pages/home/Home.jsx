import React, { useState } from "react";
import CardsContainer from "../../components/cardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getRecipes, getFilteredRecipes } from "../../redux/actions";
import { useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";

function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = recipes?.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <CardsContainer recipes={itemsToShow} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Home;
