import { Router } from 'express';
import cors from 'cors';
const webServices = Router();

webServices.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

webServices.route('/web-services').get((req, res) => {
  return res.json([
    {
      name: 'sample-web-service',
      title: 'Пример веб-сервиса',
      description: 'Описание веб-сервиса',
      parameters: {
        input: [
          {
            type: 'number',
            name: 'input_num',
            title: 'Числовое значение, передаваемое на вход программе',
          },
          {
            type: 'select',
            name: 'input_text',
            title:
              'Текстовое значение, выбираемое из списка и передаваемое на вход программе',
            items: [
              { value: 'text1', title: 'Первый элемент' },
              { value: 'text2', title: 'Второй элемент' },
            ],
          },
        ],
        output: [
          {
            type: 'string',
            name: 'result',
            title: 'Результат выполнения программы',
          },
        ],
      },
      commands: {
        start: './start.sh ${input_num} ${input_text}',
      },
    },
  ]);
});

export default webServices;
