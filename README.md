# Сбер ID. B2B team bot for telegram

## Что это?

**Если просто, то этот проект —** _простой веб интерфейс для работы с большим количеством чатов в телеграме._

Ввиду специфики работы отдела b2b Сбер ID ежедневная работа сопровождается общением с партнёрами в огромном количестве чатов в телеграме.

Для упрощения данной работы было решено использовать бота телеграм, что позволило оптимизировать время работы, а также сильно упростить поиск информации в отправленных коммуникациях и сократить количество ошибок при общении с партнёрами.

## Что умеет этот чатбот?

Бот представляет собой надстройку в виде веб-интерфейса и работает на стандартном [API телеграма](https://core.telegram.org/bots/api) 

Регистрация в системе происходит также через телеграм.

Актуальная версия v1.3 содержит в себе следующий функционал:
- Команда `/contacts` в телеграм — _Отправляет в чат актуальные контакты b2b команды_;
- Автоматическое добавление чата в базу, если бот добавлен в чат (аналогично, если бота убрали из чата);
- Управление пользователями;
  - Добавить / Удалить пользователя;
  - Изменить имя / Уровень доступа (для админов);
  - Сбросить пароль;
- Выдача контента в зависимости от уровня доступа и автора;
- Создание групп с любым набором чатов в ней;
- Отправка сообщения в созданную группу или адресно в чат(ы);
- Управление показом чатов;
- История сообщений:
  - Удалить произведённую рассылку;
  - Отредактировать сообщение;
  - Удалить сообщение из определённого чата в рассылке;
  - Закрепить / Открепить сообщение во всех или в конкретных чатах.

## API

Для работы данного проекта было также реализовано небольшое API для работы с базой и взаимодействия с API телеграм.

API написано на php. В качестве СУБД используется mySQL

## Changelog

| Версия | Дата       | Изменения                                                                                                                                                                                                                                                                     |
|--------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| v1.3   | 06.07.2022 | Релизована авторизация на JWT. <br><br>Добавлены: <ul><li>Интерфейс управления пользователями</li><li>Переделан интерфейс таблицы чатов</li><li>Ролевая модель пользователей</li><li>Управление выдачей контента в зависимости от роли</li><li>Новые команды в боте</li></ul> |
| v1.2   | 21.06.2022 | Переделан дизайн. <br><br>Добавлены: <ul><li>Адресная отправка</li><li>История сообщений</li><li>Удаление/Редактирование/Закрепление сообщений</li></ul>                                                                                                                      |
| v1.1   | 13.05.2022 | Веб-интерфейс переделан на React                                                                                                                                                                                                                                              |
| v1.0   | 30.01.2022 | Создан чатбот и прототип веб-интерфейса                                                                                                                                                                                                                                       |

## Копирайт

Автор: Нюсхаев Сергей

2022