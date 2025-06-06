```mermaid
flowchart LR

    subgraph Frontend [Frontend (Nx - Angular)]
        F[Angular Application]
        F --> Calendar[CalendarComponent]
        F --> Dialog[DayCardDialogComponent]
        F --> Host[WidgetHostComponent]
        Host --> Timetracker[TimetrackerWidget]
    end

    subgraph Backend [Backend (Nx - NestJS)]
        B[NestJS API]
        B --> Auth[AuthModule]
        B --> WidgetConfig[WidgetConfigModule]
        B --> DayData[DayDataModule]
        B --> Prisma[PrismaService]
    end

    User[User Browser] --> F
    F -->|REST| B
    Prisma --> DB[(PostgreSQL)]

    classDef db fill:#eee,stroke:#777,stroke-width:1px,color:#333
    style DB fill:#dde,stroke:#999,stroke-width:1px
```
