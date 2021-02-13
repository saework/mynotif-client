import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { IAction, IRootReducer, IBdRow, TActionPayload, ILoginData } from '../interfaces';
import { IAction, IRootReducer, IBdRow, ILoginData } from '../interfaces';

// export const initialState : IRootReducer = {
//     //currentUser: '',
//     currentUser: 'test@test',
//     currentId: 0,
//     checkedId: 0,
//     jwtToken: {jwt: "sfsfsd"},
//     //jwtToken: {},
//     bdRows: [],
// };

export const initialState: IRootReducer = {
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

export function rootReducer(state: IRootReducer = initialState, action: IAction) {
  // const payload: TActionPayload = action.payload;
  // const type: string = action.type;
  const { payload, type } = action;
  // switch (action.type) {
  switch (type) {
    // всегда возвращаем новый state!
    case 'DRAW_ROWS': {
      // return { ...state, bdRows: action.payload };
      return { ...state, bdRows: payload };
    }
    case 'CHECK_ID_ROW': {
      return { ...state, checkedId: payload };
    }
    case 'ADD_BD_ROW': {
      return {
        ...state,
        currentId: state.currentId + 1,
        bdRows: [...state.bdRows, payload],
      };
    }
    case 'DEL_BD_ROW': {
      return {
        ...state,
        bdRows: [...state.bdRows.filter((item) => item.id !== payload)],
      };
    }
    case 'EDIT_BD_ROW': {
      // редактирование записи
      const editBdRow: IBdRow = payload as IBdRow;
      const { id, persName, bdDate, bdComm, bdTmz, bdPeriod } = editBdRow;
      return {
        ...state, // возвращаем новый state
        bdRows: state.bdRows.map((bdRow) => {
          if (bdRow.id === id) {
            return {
              ...bdRow, // возвращаем новый bdRow с новыми полями после ,
              persName,
              bdDate,
              bdComm,
              bdTmz,
              bdPeriod,
            };
          }
          return bdRow; // в map возвращаем новый собранный bdRow
        }),
      };
    }
    case 'LOAD_BD': {
      return payload;
    }
    case 'LOGIN_SAVE_STORE': {
      const loginData: ILoginData = payload as ILoginData;
      return { ...state, currentUser: loginData.currentUser, jwtToken: loginData.jwtToken };
    }
    case 'RESET_STORE': {
      return initialState;
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
