import React, { useEffect } from "react";

// Styled Component
import { Wrapper, ListingsContainer } from "./Home.styles";
// Bootstrap Components

// Validation
import { useAuth } from "../../hooks/useAuth";
import { useHomeFetch } from "./../../hooks/useHomeFetch";

//components
import Spinner from "../common/Spinner";
import AuctionListingRow from "../AuctionListingRow";
import SearchBar from "../SearchBar";
import Paginator from "../common/Paginator";

import ThomCodesModal from "../ThomCodesModal";

const Home = () => {
  const auth = useAuth();
  const { state, loading, error, doNewSearch, pageNum, setPageNum } =
    useHomeFetch();

  return (
    <>
      <ThomCodesModal />
      <SearchBar doNewSearch={doNewSearch} />
      {loading && <Spinner />}
      <Wrapper className="max-width-margin">
        <ListingsContainer>
          {state.count > 0
            ? state.results.map(
                (auction) =>
                  auction.is_active && (
                    <AuctionListingRow
                      key={auction.id}
                      auction={auction}
                      isWatched={auction.user_is_following}
                      isAuthorized={auth.user}
                    />
                  )
              )
            : "There are no listings"}
        </ListingsContainer>
        <Paginator
          totalPages={state.total_pages}
          currentPage={pageNum}
          setCurrentPage={setPageNum}
        />
      </Wrapper>
    </>
  );
};

export default Home;
