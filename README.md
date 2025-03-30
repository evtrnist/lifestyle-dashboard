flowchart LR
    A[Пользователь в браузере] --> B[Angular Frontend]

    subgraph Frontend (Nx - Angular)
    B --- BC[CalendarComponent & DayComponent]
    B --- BD[WidgetHostComponent]
    BD --- BE[(TimetrackerWidgetComponent, MoneySpentWidget и др.)]
    end

    B -->|HTTP/REST| C[NestJS Backend]

    subgraph Backend (Nx - Nest.js)
    C --- CA[UserModule & AuthModule]
    C --- CB[WidgetConfigModule]
    C --- CC[DayDataModule]
    end

    C -->|Прямая работа через Prisma| D[(Database)]
    D[(DB)]:::db

    style D fill:#dde,stroke:#999,stroke-width:1px
    
    classDef db fill:#eee,stroke:#777,stroke-width:1px,color:#333
