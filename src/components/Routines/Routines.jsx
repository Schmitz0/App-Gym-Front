import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import AllRoutines from "../AllRoutines/AllRoutines";
// import BtnRoutines from "../BtnRoutines/BtnRoutines";
import style2 from "./Routines.module.css";
import style3 from "./Fav.module.css";
import style4 from "./BtnRoutines.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import style from "./Filters.module.css";
import { muscles, duration, difficulty } from "./Datos.js";
import { ApiQuery, useGetRoutinesQuery } from "../../redux/query/api";
import Loading from "../Loading/Loading";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFilter } from "./FiltersContex";
import { useSelector } from "react-redux";
import { getToken } from "../../services/cookies";
import { Link } from "react-router-dom";

const Routines = () => {
  const role = getToken().userRole;
  const { routinesFilters, setRoutinesFilters } = useFilter();
  const [input, setInput] = useState({
    muscles: [],
    difficulty: [],
    duration: [],
    favourite: 0,
  });
  const handlerClick = (event) => {
    if (input.favourite || routinesFilters.favourite) {
      setInput({ ...input, favourite: 0 });
      setRoutinesFilters({ ...routinesFilters, favourite: 0 });
    } else {
      setInput({ ...input, favourite: 1 });
      setRoutinesFilters({ ...routinesFilters, favourite: 1 });
    }
  };

  const handlerCheck = (event) => {
    let checked = event.target.checked;
    let value = event.target.value;
    let name = event.target.name;

    if (name !== "muscles") value = parseInt(value);

    checked
      ? setInput({
          ...input,
          [name]: [...new Set([...input[name], value])],
        })
      : setInput({
          ...input,
          [name]: input[name].filter((f) => f !== value),
        });

    checked
      ? setRoutinesFilters({
          ...routinesFilters,
          [name]: [...new Set([...routinesFilters[name], value])],
        })
      : setRoutinesFilters({
          ...routinesFilters,
          [name]: routinesFilters[name].filter((f) => f !== value),
        });
  };
  const aux = {};
  for (const a in routinesFilters) {
    if (a === "favourite" && routinesFilters[a]) aux[a] = routinesFilters[a];
    if (routinesFilters[a].length > 0) aux[a] = [...routinesFilters[a]];
  }
  for (const a in input) {
    if (a === "favourite" && input[a]) aux[a] = input[a];
    if (input[a].length > 0) aux[a] = [...input[a]];
  }

  const clear = () => {
    setInput({
      muscles: [],
      difficulty: [],
      duration: [],
    });
    setRoutinesFilters({
      muscles: [],
      difficulty: [],
      duration: [],
    });
  };

  const { data, isLoading, isSuccess: success } = useGetRoutinesQuery(aux);
  const { originalArgs, isSuccess } = useSelector(
    ApiQuery.endpoints.getRoutines.select(aux)
  );
  if (isSuccess) {
    if (originalArgs.duration) {
      var durationF = originalArgs.duration.map((e) => e);
    }
    if (originalArgs.muscles) {
      var musclesF = originalArgs.muscles.map((e) => e);
    }
    if (originalArgs.difficulty) {
      var difficultyF = originalArgs.difficulty.map((e) => e);
    }
  }

  if (isLoading) return <Loading />;
  return (
    <div>
      <NavBar />
      <div className={style2.mainContainer}>
        {/* FILTROS */}
        <div className={style.allContainer}>
          {/* FILTRO DE MUSCULOS*/}
          <div className={style.mainContainer}>
            <div className={style.titleContainer}>
              <h3>{muscles.title}</h3>
            </div>
            <div className={style.checksContainer}>
              {muscles.value.map((checkboxes, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      sx={{
                        padding: "6px",
                        color: "#0d0d6b",
                        "&.Mui-checked": {
                          color: "#0d0d6b",
                        },
                      }}
                      value={checkboxes}
                      onChange={handlerCheck}
                    />
                  }
                  checked={
                    musclesF?.find((f) => f === checkboxes) ||
                    routinesFilters.muscles?.find((f) => f === checkboxes)
                      ? true
                      : false
                  }
                  label={checkboxes}
                  name={muscles.name}
                  sx={{
                    marginRight: "0px",
                    marginLeft: "-10px",
                    color: "#2d2d2d",
                  }}
                />
              ))}
            </div>
          </div>
          {/* FILTRO DE TIEMPO*/}
          <div className={style.mainContainer}>
            <div className={style.titleContainer}>
              <h3>{duration.title}</h3>
            </div>
            <div className={style.checksContainer}>
              {duration.value.map((checkboxes, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      sx={{
                        padding: "6px",
                        color: "#0d0d6b",
                        "&.Mui-checked": {
                          color: "#0d0d6b",
                        },
                      }}
                      value={parseInt(checkboxes)}
                      onChange={handlerCheck}
                    />
                  }
                  checked={
                    durationF?.find((f) => f === checkboxes) ||
                    routinesFilters.duration.find((f) => f === checkboxes)
                      ? true
                      : false
                  }
                  label={duration.label[i]}
                  name={duration.name}
                  sx={{
                    marginRight: "0px",
                    marginLeft: "-10px",
                    color: "#2d2d2d",
                  }}
                />
              ))}
            </div>
          </div>
          {/* FILTRO DE DIFICULTAD*/}
          <div className={style.mainContainer}>
            <div className={style.titleContainer}>
              <h3>{difficulty.title}</h3>
            </div>
            <div className={style.checksContainer}>
              {difficulty.value.map((checkboxes, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      sx={{
                        padding: "6px",
                        color: "#0d0d6b",
                        "&.Mui-checked": {
                          color: "#0d0d6b",
                        },
                      }}
                      value={parseInt(checkboxes)}
                      onChange={handlerCheck}
                    />
                  }
                  checked={
                    difficultyF?.find((f) => f === checkboxes) ||
                    routinesFilters.difficulty.find((f) => f === checkboxes)
                      ? true
                      : false
                  }
                  label={difficulty.label[i]}
                  name={difficulty.name}
                  sx={{
                    marginRight: "0px",
                    marginLeft: "-10px",
                    color: "#2d2d2d",
                  }}
                />
              ))}
            </div>
          </div>
          <Button
            variant="contained"
            onClick={clear}
            sx={{
              background: "#0d0d6b",
              "&:hover": {
                backgroundColor: "#62629f",
                transition: "0.4s",
              },
            }}
          >
            Limpiar Filtros
          </Button>
        </div>
        <div className={style2.cardsContainer}>
          {/* <BtnRoutines /> */}
          <div className={style4.mainContainer}>
            <div className={style4.infoContainer}>
              <h1 className={style4.title}>Rutinas</h1>
              {/* <BtnFilter /> */}
              <div className={style3.mainContainer}>
                <Link to="/rutinas/crear" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={
                      role === "Admin" || role === "Staff"
                        ? {
                            background: "#0d0d6b",
                            "&:hover": {
                              backgroundColor: "#62629f",
                              transition: "0.4s",
                            },
                          }
                        : { display: "none" }
                    }
                  >
                    Nueva Rutina
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  sx={{
                    padding: "8px 12px",
                    background: "#0d0d6b",
                    "&:hover": {
                      backgroundColor: "#62629f",
                      transition: "0.4s",
                    },
                    minWidth: "fit-content",
                    "& .css-1d6wzja-MuiButton-startIcon": {
                      margin: "0px",
                    },
                  }}
                  onClick={handlerClick}
                  startIcon={
                    input.favourite || routinesFilters.favourite ? (
                      <StarIcon sx={{ color: "#fafafa" }} />
                    ) : (
                      <StarBorderIcon sx={{ color: "#fafafa" }} />
                    )
                  }
                />
              </div>
            </div>
            <hr />
          </div>
          {success && isSuccess && (
            <AllRoutines
              routines={data}
              favFilter={input.favourite}
              role={role}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Routines;
