import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { IAction, IRootReducer, IBdRow, TActionPayload, ILoginData } from "../interfaces";


// export const initialState : IRootReducer = {
//     //currentUser: '',
//     currentUser: 'test@test',
//     currentId: 0,
//     checkedId: 0,
//     jwtToken: {jwt: "sfsfsd"},
//     //jwtToken: {},
//     bdRows: [],
// };

export const initialState : IRootReducer = {
  // router: {
  //   location: {},
  //   action: "POP",
  // },
  // rootReducer: {
    currentUser: '',
    currentId: 0,
    checkedId: 0,
    jwtToken: '',
    bdRows: [],
//  },
};

// export const initialState : IRootReducer = {
//  // export const initialState = {
//   // router: {
//   //   location: {},
//   //   action: "POP",
//   // },
//   // rootReducer: {
//     currentUser: "test@test",
//     currentId: 4,
//     checkedId: 0,
//     bdRows: [
//       {
//         id: 1,
//         persName: "Иванов Иван Иванович",
//         bdDate: "13.01.2021, 23:09",
//         bdComm: "Комментарий",
//         bdTmz: "Asia/Yekaterinburg",
//         bdPeriod: "Без повторов"
//       },
//       {
//         id: 2,
//         persName: "Сидоров Андрей Петрович",
//         bdDate: "10.01.2021, 20:27",
//         bdComm: "Длинный комментарий",
//         bdTmz: "Asia/Yekaterinburg",
//         bdPeriod: "Ежедневно"
//       },
//       {
//         id: 4,
//         persName: "Петров Иван Васильевич",
//         bdDate: "13.01.2021, 23:08",
//         bdComm: "Очень длинный комментарий",
//         bdTmz: "Asia/Yekaterinburg",
//         bdPeriod: "Ежегодно"
        
//       },
//     ],
//  // },
// };

export function rootReducer(state : IRootReducer = initialState , action: IAction) {
const payload: TActionPayload = action.payload;
const type: string = action.type;
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
      console.log(state);
      return {
        ...state,
        bdRows: [...state.bdRows.filter((item) => item.id !== action.payload)],
      };
    }
    case "EDIT_BD_ROW": { // редактирование записи
      const editBdRow: IBdRow=action.payload as IBdRow;
      return {
        ...state, // возвращаем новый state
        bdRows: state.bdRows.map((bdRow) => {
          if (bdRow.id === editBdRow.id) {
            return {
              ...bdRow, // возвращаем новый bdRow с новыми полями после ,
              persName: editBdRow.persName,
              bdDate: editBdRow.bdDate,
              bdComm: editBdRow.bdComm,
              bdTmz: editBdRow.bdTmz,
              bdPeriod: editBdRow.bdPeriod,
            };
          }
          return bdRow; // в map возвращаем новый собранный bdRow
        }),
      };
    }
    case "LOAD_BD": {
      return action.payload;
    }
    case "LOGIN_SAVE_STORE": {
      const loginData: ILoginData = action.payload as ILoginData;

      console.log(loginData);
      return { ...state, currentUser: loginData.currentUser, jwtToken: loginData.jwtToken };
    }
    default:
      return state;
  }
}

// данные в объекте rootReducer, а не store
export const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    rootReducer,
  });
