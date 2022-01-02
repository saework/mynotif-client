import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { IAction, IRootReducer, IBdRow, ILoginData } from '../interfaces';

/** Очень хорошо когда всё что связано со стейтом лежит в одной папке.
 * Я бы перенесла этот файл в store/reducers/index.ts
 */

/** Так же очень полезно все константы выносить отдельно в constants.ts и класть под ноги */
export const initialState: IRootReducer = {
  currentUser: '',
  currentId: 0,
  checkedId: 0,
  jwtToken: '',
  bdRows: [],
};

export function rootReducer(state: IRootReducer = initialState, action: IAction) {
  const { payload, type } = action;
  switch (type) {
    case 'DRAW_ROWS': {
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
      // Редактирование записи
      const editBdRow: IBdRow = payload as IBdRow;
      const { id, persName, bdDate, bdComm, bdTmz, bdPeriod } = editBdRow;
      return {
        ...state, // Возвращаем новый state
        bdRows: state.bdRows.map((bdRow) => {
          if (bdRow.id === id) {
            return {
              ...bdRow, // Возвращаем новый bdRow с новыми полями после ,
              persName,
              bdDate,
              bdComm,
              bdTmz,
              bdPeriod,
            };
          }
          return bdRow; // В map возвращаем новый собранный bdRow
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

// Данные в объекте rootReducer
export const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    rootReducer,
  });
