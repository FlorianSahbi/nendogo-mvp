import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import Error from "../components/Error";
import Card from "../components/Card";
import GridLayout from "../components/GridLayout";
import Typography from '../components/Typography';
import { GET_NENDOROIDS } from "../graphql/nendoroids";
import { useDebouncedCallback } from 'use-debounce';
import { Palette } from "./Layout";
import { Theme } from "../App";

const NendoroidsFeed = ({ filters }) => {
  const theme = Theme.useContainer();
  const [searchValue, setSearchValue] = useState(null);
  const [[min, max], setRangeFilter] = useState([1201, 1300]);

  const { data, loading, error, fetchMore } = useQuery(GET_NENDOROIDS, {
    variables: { "start": 0, "min": min, "max": max, "searchValue": searchValue }
  });

  function Search({ placeholder, onSearchFilter }) {
    const styles = {
      root: {
        height: "100%",
        width: "160px",
        outline: "unset",
        backgroundColor: Palette[theme.theme].elevation1,
        border: `1px solid ${Palette[theme.theme].secondary}`,
        paddingLeft: "1rem",

        fontFamily: "Sawarabi Mincho",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "1.5rem",
        color: Palette[theme.theme].text.primary,
      }
    }

    const [debouncedCallback] = useDebouncedCallback((searchValue) => {
      onSearchFilter(searchValue);
    }, 1000);

    return (
      <input style={styles.root} placeholder={placeholder} onChange={(e) => debouncedCallback(e.target.value)} />
    );
  }

  const Filters = ({ onRangeFilter }) => {
    const buttons = [
      { id: 0, label: "000-100", min: 0, max: 100 },
      { id: 1, label: "101-200", min: 101, max: 200 },
      { id: 2, label: "201-300", min: 201, max: 300 },
      { id: 3, label: "301-400", min: 301, max: 400 },
      { id: 4, label: "401-500", min: 401, max: 500 },
      { id: 5, label: "501-600", min: 501, max: 600 },
      { id: 6, label: "601-700", min: 601, max: 700 },
      { id: 7, label: "701-800", min: 701, max: 800 },
      { id: 8, label: "801-900", min: 801, max: 900 },
      { id: 9, label: "901-1000", min: 901, max: 1000 },
      { id: 10, label: "1001-1100", min: 1001, max: 1100 },
      { id: 11, label: "1101-1200", min: 1101, max: 1200 },
      { id: 12, label: "1201-1300", min: 1201, max: 1300 },
      { id: 13, label: "All", min: 0, max: 9999 },
    ]

    const styles = {
      root: {
        height: "100%",
        widdth: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(14, 95px)",
        gap: "0.5rem",
        paddingLeft: "10px",
      },
    }

    const setFilter = (min, max) => {
      console.log({ min, max })
      onRangeFilter([min, max]);
    }

    const Filter = ({ label, onClick }) => {
      const [onHover, setOnHover] = useState(false);

      const styles = {
        root: {
          width: "100%",
          height: "100%",
          border: `1px solid ${Palette[theme.theme].secondary}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backgroundColor: Palette[theme.theme].elevation1,
        },
        active: {
          width: "100%",
          height: "100%",
          border: `1px solid ${Palette[theme.theme].secondary}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backgroundColor: Palette[theme.theme].elevation1,
        }
      }

      return (
        <div style={onHover ? styles.active : styles.root} onClick={onClick} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
          <Typography alignItems="center" type="body1" text={label} />
        </div>
      )
    }


    return (
      <div style={styles.root}>
        {buttons.map(({ id, label, min, max }) => <Filter key={`${id}-${label}-filter`} label={label} onClick={() => setFilter(min, max)} />)}
      </div>
    )
  }

  const RenderSkeleton = ({ number = 20 }) => {
    let skeletons = [];
    for (let i = 0; i < number; i++) {
      skeletons = [...skeletons, <Card key={Math.random()} loading />]
    }
    return (
      <>
        {skeletons.map(skeleton => skeleton)}
      </>
    )
  }

  const RenderCards = () => {
    return (
      data.nendoroids.map(({ id, formattedName, images, number }) => <Card key={id} id={id} formattedName={formattedName} number={number} images={images} path={`/nendoroid/${id}`} fill />)
    )
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (data || loading) {
    return (
      <>
        {filters &&
          <div style={{ height: "60px", display: "flex", padding: "0 10px", paddingTop: "10px" }}>
            <Search placeholder="Search" onSearchFilter={(v) => { setRangeFilter([0, 9999]); setSearchValue(v) }} />
            <Filters onRangeFilter={(v) => { setRangeFilter(v); setSearchValue(null) }} />
          </div>
        }
        <GridLayout itemsPerRow={5} rowHeight={200}>
          {loading && <RenderSkeleton key={"idk"} />}
          {!loading && <RenderCards />}
        </GridLayout>
        <div onClick={() => fetchMore({
          variables: { start: data.nendoroids.length }, updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              nendoroids: [...prev.nendoroids, ...fetchMoreResult.nendoroids]
            })
          }
        })}>
          <Typography type="h3" text="More" textAlign="center" />
        </div>
      </>
    )
  }
}

export default NendoroidsFeed;