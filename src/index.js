import './style';
import App from './components/app';

require('dayjs/locale/de')
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
dayjs.locale('de')

export default App;
