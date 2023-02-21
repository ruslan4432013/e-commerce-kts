# E-Commerce проект по продаже мебели на React

Этот проект - интернет-магазин мебели, созданный с использованием React. Он предоставляет возможность просматривать каталог товаров и страницы товаров
## Установка и запуск проекта

1. Клонируйте репозиторий на свой компьютер:
    ```shell
    git clone https://github.com/ruslan4432013/e-commerce-kts.git
    ```
2. Перейдите в папку проекта:
    ```shell
    cd  e-commerce-kts
    ```
3. Установите зависимости с помощью менеджера пакетов yarn:
    ```shell
    yarn install
    ```
4. Установите зависимости с помощью менеджера пакетов yarn:
    ```shell
    yarn start
    ```
5. Откройте в браузере страницу http://localhost:3000 для просмотра проекта.


## Функциональность

Пользователи могут искать товары по названию или категории и просматривать отдельные страницы товаров

## Технологии

В этом проекте использованы следующие технологии:

+ **React** - библиотека для создания пользовательских интерфейсов
+ **Typescript** - язык программирования, расширяющий возможности JavaScript 
+ **React Router** - для управления маршрутизацией приложения
+ **MobX** - для управления состоянием приложения
+ **Axios** - для отправки HTTP-запросов на сервер
+ **SASS** - для стилизации компонентов

React был выбран для создания пользовательского интерфейса, потому что он позволяет создавать компоненты, которые могут быть многократно использованы на разных страницах сайта. Typescript был выбран, потому что он позволяет создавать более надежный и поддерживаемый код, чем обычный JavaScript

## Структура проекта

Структура проекта выглядит следующим образом:
```
└── src/
    ├── app/                    # Инициализирующая логика приложения                #
    |                           #
    ├── pages/                  # Слой: Страницы приложения
    |   ├── {some-page}/        #     Слайс: (пример: Main страница)
    |   |   ├── lib/            #         Сегмент: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Сегмент: Бизнес-логика
    |   |   └── ui/             #         Сегмент: Логика UI
    |   ...                     #
    |                           #
    ├── widgets/                # Слой: Самостоятельные и полноценные блоки для страниц
    |   ├── {some-widget}/      #     Слайс: (пример: Header widget)
    |   |   ├── lib/            #         Сегмент: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Сегмент: Бизнес-логика
    |   |   └── ui/             #         Сегмент: Логика UI
    ├── features/               # Слой: Обрабатываемые пользовательские сценарии
    |   ├── {some-feature}/     #     Слайс: (пример: Filter feature)
    |   |   ├── lib/            #         Сегмент: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Сегмент: Бизнес-логика
    |   |   └── ui/             #         Сегмент: Логика UI
    |   ...                     #
    |                           #
    ├── entities/               # Слой: Бизнес-сущности, которыми оперирует предметная область
    |   ├── {some-entity}/      #     Слайс: (например: сущность Product)
    |   |   ├── lib/            #         Сегмент: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Сегмент: Бизнес-логика
    |   |   └── ui/             #         Сегмент: Логика UI
    |   ...                     #
    |                           #
    ├── shared/                 # Слой: Переиспользуемые модули, без привязки к бизнес-логике
    |   ├── api/                #         Сегмент: Логика запросов к API (api instances, requests, ...)
    |   ├── config/             #         Сегмент: Конфигурация приложения (env-vars, ...)
    |   ├── lib/                #         Сегмент: Инфраструктурная логика приложения (utils/helpers)
    |   └── ui/                 #         Сегмент: UIKit приложения
    ├── styles/                 # Слой: С глоабльными стилями, миксинами и переменными 
    |   ...                     #
    |                           #
    └── index.tsx/              #
```
