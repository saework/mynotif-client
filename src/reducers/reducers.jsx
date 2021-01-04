import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// export const initialState = {
//   router: {
//     location: {},
//     action: "POP",
//   },
//   rootReducer: {
//     currUserEmail: "test@test",
//     currentId: 0,
//     checkedId: 0,
//     bdRows: [],
//   },
// };

export const initialState = {
  router: {
    location: {},
    action: "POP",
  },
  rootReducer: {
    currentUser: "test@test",
    currentId: 4,
    checkedId: 0,
    bdRows: [
      {
        id: 1,
        persName: "Иванов Иван Иванович",
        bdDate: "01.02.1998",
        bdComm: "Комментарий",
      },
      {
        id: 2,
        persName: "Сидоров Андрей Петрович",
        bdDate: "03.12.1996",
        bdComm: "Длинный комментарий",
      },
      {
        id: 4,
        persName: "Петров Иван Васильевич",
        bdDate: "12.04.1986",
        bdComm: "Очень длинный комментарий",
      },
    ],
  },
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    // всегда возвращаем новый state!
    case "DRAW_ROWS": {
      return { ...state, bdRows: action.payload };
    }
    case "CHECK_ID_ROW": {
      return { ...state, checkedId: action.payload };
    }
    case "ADD_BD_ROW": {
      return {
        ...state,
        currentId: state.currentId + 1,
        bdRows: [...state.bdRows, action.payload],
      };
    }
    case "DEL_BD_ROW": {
      return {
        ...state,
        bdRows: [...state.bdRows.filter((item) => item.id !== action.payload)],
      };
    }
    case "EDIT_BD_ROW": { // редактирование записи
      const editBdRow = action.payload;
      return {
        ...state, // возвращаем новый стор
        bdRows: state.bdRows.map((bdRow) => {
          if (bdRow.id === editBdRow.id) {
            return {
              ...bdRow, // возвращаем новый bdRow с новыми полями после ,
              persName: editBdRow.persName,
              bdDate: editBdRow.bdDate,
              bdComm: editBdRow.bdComm,
            };
          }
          return bdRow; // в map возвращаем новый собранный bdRow
        }),
      };
    }
    case "LOAD_BD": {
      return action.payload;
    }
    default:
      return state;
  }
}

// данные в объекте rootReducer, а не store
export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    rootReducer,
  });
