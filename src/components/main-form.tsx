import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
/** Так же, не нужно использовать дефолтный импорт и тащить весь пакет в этот файл
 * Это относится к moment и moment-timezone.
 * Так же обрати внимание что в гите к обоим пакетам написано что
 * "is a legacy project, now in maintenance mode. In most cases, you should choose a different library"
 * Посмотри в сторону dayjs. Я часто его вижу на проектах и использую сама.
 * И обязательно проверяй в каком статусе пакеты, которые тащишь в проект, и сколько у них звезд
 * (меньше 500-1000 в зависимости от ситуации).
 * Если звезд слишком мало, то велика вероятность что пакет быстро умрет, или у него есть/будет слабая поддержка
 * и на такой пакет полагаться не стоит
 */
import moment from 'moment';
import momenttz from 'moment-timezone';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { getCurrentId } from '../functions';
import { addBdRow, editBdRow } from '../actions/actions';
import { IBdRow, IStore, ItmzObj } from '../interfaces';
import config from '../configs/config';

/**
 * Всё что до интерфейсов явно не должно здесь находиться.
 * Интерфейс тоже, как говорила, лучше в отдельный файл.
 */
registerLocale('ru', ru);

const { periodArr } = config;
const timeZones = momenttz.tz.names();

/** Название переменной с сокращениями. Не бойся длинных названий (в разумных пределах).
 * timeZoneArray - очень даже приемлемо. Ещё лучше, если Array заменить на что-то более
 * подходящее по смыслу
 */
const tmzArr: ItmzObj[] = [];

/** Такая мутация tmzArr ни есть хорошо, если мы придерживаемся
 * функционального подхода и иммутабельности данных.
 * Кроме того, мне не очень понятно зачем ты используешь Object.keys,
 * если momenttz.tz.names возвращает string[].
 * Я вижу, что здесь лучше использовать map. Я переписала бы это так: */
const timeZoneArray = timeZones.map((value) => ({
  value,
  timeZoneText: ` (GMT${moment.tz(value).format('Z')}) ${value}`,
}));
/** Обязательно изучи и пойми все основные функциональные методы работы с массивами (если не до конца знаешь)
 * Это map, reduce (иногда с ним такую крутую магию можно сделать), filter, find, sort и т.д.
 * Перечисленные мною методы - те с которыми приходится работать постоянно.
 */

/** Так же, такие сокращения как i часто не приемлемы там, где придерживаются хорошего code style.
 * Пиши index, поначалу непривычно, а сейчас мне такое сокращение как i режет глаз.
 */
Object.keys(timeZones).forEach((i: any) => {
  const tmzObj: ItmzObj = {
    /** А тут уже наоборот. timeZoneValue, timeZoneText - излишнее уточнее "timeZone...".
     * Ты уже находишься внутри сущности timeZone, можно и нужно использовать простые имена, т.е. value, text
     */
    timeZoneValue: timeZones[i],
    timeZoneText: ` (GMT${moment.tz(timeZones[i]).format('Z')}) ${timeZones[i]}`,
  };
  tmzArr.push(tmzObj);
});

/** Pers - сокращение
 * newbdRow - newBDRow
 */
interface IProps {
  addBdRow: (newbdRow: IBdRow) => void;
  checkedId: number;
  editBdRow: (newbdRow: IBdRow) => void;
  bdPeriodVal: string;
  setBdPeriodVal: (bdPeriodVal: string) => void;
  buttonAddName: string;
  setButtonAddName: (buttonAddName: string) => void;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  persNameVal: string;
  setPersNameVal: (persNameVal: string) => void;
  bdCommVal: string;
  setBdCommVal: (bdCommVal: string) => void;
  bdTmzVal: string;
  setBdTmzVal: (bdTmzVal: string) => void;
  persNameRef: any;
}

function MainForm(props: IProps) {
  /** Почему ниже берешь значения пропсов через обращение к объекту props?
   * У тебя вот тут все пропсы получены через деструктуризацию */
  const { persNameRef, persNameVal, startDate, bdPeriodVal, bdTmzVal, bdCommVal, buttonAddName } = props;

  const [validated, setValidated] = useState<boolean>(false);
  /** Всё что можно убрать из компоненты - нужно убрать
   * Эти функции запросто выносятся за пределы компоненты, и не содержат внешних зависимостей
   * вроде state.
   * Плюс раз возвращается jsx элемент, то это маленькая компонента! Скорее клади её во внутреннюю папочку components
   * Тут как раз было бы хорошо, если компонента лежала в своей папке.
   */
  const tmzSelectField = (tmzObj: any) => (
    <option value={tmzObj.timeZoneValue} key={tmzObj.timeZoneValue}>
      {tmzObj.timeZoneText}
    </option>
  );
  const periodSelectField = (period: string) => (
    <option value={period} key={period}>
      {period}
    </option>
  );

  const handleAddButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      /** Почему let? Почему значение задаёшь строчкой ниже и никак потом не меняешь?
       * Вообще, старайся избегать использования let если придерживаешься функционального подхода
       */
      let bdDateVal: string = '';
      bdDateVal = moment(props.startDate).format('DD.MM.YYYY, H:mm');
      /** "Добавить" и "Сохранить изменения" - это магические строки! Скажи им нет!
       * Очень хорошо все строки запирать в константы или Enum.
       * Например тут бы хорошо смотрелась enum.
       * Причем я бы сделала ещё один уровень абстракции. Извне передается тип кнопки (тоже enum)
       * А текст кнопки уже внутри компоненты определять в зависимости от типа. Тоже через enum и доп функцию
       * которая на вход получает тип кнопки, а на выходе выдает её текст. Эту функцию выносим в локальную папку utils
       */
      if (props.buttonAddName === 'Добавить') {
        const id = getCurrentId() + 1;
        const newbdRow: IBdRow = {
          /** Зачем везде окончание ...Val?
           * Без него можно было бы обойтись без преназначения,
           * как ты делаешь с id
           */
          id,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          bdPeriod: bdPeriodVal,
        };
        props.addBdRow(newbdRow);
        props.setBdCommVal('');
        props.setPersNameVal('');
        if (props.persNameRef.current !== null) {
          props.persNameRef.current.focus();
        }
      }
      if (props.buttonAddName === 'Сохранить изменения') {
        const newbdRow = {
          id: props.checkedId,
          persName: persNameVal,
          bdDate: bdDateVal,
          bdComm: bdCommVal,
          bdTmz: bdTmzVal,
          bdPeriod: bdPeriodVal,
        };
        props.editBdRow(newbdRow);
        props.setButtonAddName('Добавить');

        // Очищаем поля
        props.setPersNameVal('');
        props.setBdCommVal('');
      }
      setValidated(false);
    }
  };
  const handleBdTmz = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdTmz = e.currentTarget as HTMLSelectElement;
    props.setBdTmzVal(bdTmz.value);
  };
  const handleBdComm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdComm = e.currentTarget as HTMLInputElement;
    props.setBdCommVal(bdComm.value);
  };
  const handlePersName = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const persName: any = e.currentTarget as HTMLInputElement;
    props.setPersNameVal(persName.value);
  };
  const handleBdPeriod = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bdPeriod: any = e.currentTarget as HTMLSelectElement;
    props.setBdPeriodVal(bdPeriod.value);
  };
  const handleDatePicker = (date: any): void => {
    props.setStartDate(date);
  };
  /** Опять же, все названия полей я бы вынесла в константы.
   * Можешь подумать над системой локализации, даже если язык у тебя один.
   * Создать src/localization/ru.ts и туда всё складывать, группировать. Можно над этим накрутить абстракцию
   * по получению строки
   */
  return (
    <Row md={1} className="main-page__bd-form">
      <Col>
        <Form noValidate validated={validated} onSubmit={handleAddButtonClick}>
          <Form.Row>
            <Form.Group as={Col} controlId="persName">
              <Form.Label>Название уведомления:</Form.Label>
              <Form.Control required type="text" ref={persNameRef} onChange={handlePersName} value={persNameVal} />
              <Form.Control.Feedback type="invalid">Заполните поле</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="bdDate">
              <Form.Label>Дата, время уведомления:</Form.Label>
              <DatePicker id="bdDateTime" className="form-control" locale="ru" selected={startDate} onChange={handleDatePicker} showTimeSelect dateFormat="Pp" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="bdPeriod">
              <Form.Label>Повтор:</Form.Label>
              <Form.Control as="select" onChange={handleBdPeriod} value={bdPeriodVal}>
                {periodArr.map((period: string) => periodSelectField(period))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="bdTmz">
              <Form.Label>Часовой пояс:</Form.Label>
              <Form.Control as="select" onChange={handleBdTmz} value={bdTmzVal}>
                {tmzArr.map((tmzObj: any) => tmzSelectField(tmzObj))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="bdComm">
            <Form.Label>Подробности по уведомлению:</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleBdComm} value={bdCommVal} />
          </Form.Group>
          <Button id="buttonAdd" type="submit" variant="success" size="lg" block className="main-form__button-add">
            {buttonAddName}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
/** У redux есть аналоги на хуках, связка map... и connect уже немного устарела
 * https://react-redux.js.org/api/hooks
 */
const mapStateToProps = (store: IStore) => ({
  bdRows: store.rootReducer.bdRows,
  checkedId: store.rootReducer.checkedId,
});
const mapDispatchToProps = (dispatch: any) => ({
  addBdRow: (newbdRow: IBdRow) => dispatch(addBdRow(newbdRow)),
  editBdRow: (editbdRow: IBdRow) => dispatch(editBdRow(editbdRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
