import { isMapLoaded, returnSearchAddressCoordinates } from './moduls/map.js';//отслеживает загрузку карты. Возвращает координаты метки.
import { deactivatePage } from './moduls/deactivate-page.js';//деактивирует страницу (карту и форму) дл окончания загрузки карты
import { activatePage } from './moduls/activate-page.js';//активирует страницу (карту и форму) после загрузки карты
import { fillForm, postData } from './moduls/fill-form-post-data.js';//проверяет ввод данных на корректность, возвращает индикаторы некорректного ввода. отвечает за отправку данных на сервер/вывод индикаторов неуспешной отправки.
import {getArraySimilarAdvertisements} from './moduls/advertisements.js';//вовзращает массив объявлений по заданному адресу и расставляет метки на карте
import {filterAdvertisements} from './moduls/advertisements.js';//отвечает за фильтрацию объявлений
import {openAdvertisementCard, closeAdvertisementCard} from './moduls/advertisements.js';//обеспечивают работу с карточкой объявления

(isMapLoaded)? activatePage(): deactivatePage ();
fillForm();
postData();
getArraySimilarAdvertisements(returnSearchAddressCoordinates());
filterAdvertisements({getArraySimilarAdvertisements});
openAdvertisementCard(getArraySimilarAdvertisements);
closeAdvertisementCard(getArraySimilarAdvertisements);

