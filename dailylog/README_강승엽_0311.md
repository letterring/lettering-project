# 강승엽 TODO

### 250311

- [x] ERD 초안 작성
- [x] 현직자 리뷰 준비
- [x] 특화 프로젝트 2주차 Jira 작성
- [x] 기능 요구사항 수정

## 필드 설계

아래는 각 엔티티(테이블)의 필드 설계 내용입니다.

---

### 사용자[users]

- id
- email
- 생성시간
- password
- nickname
- username
- 전화번호
- roadAddress
- detailAddress
- provider
- font - enum 타입

### 편지[letters]

- id
- userId - 작성자
- 실링왁스id 외래키
- 퀴즈 질문
- 퀴즈 힌트
- 퀴즈 답
- 보낸시간
- 조건 타입 - enum(예약 전송, 타임캡슐)
- 조건 시간
- 최초 오픈 시간 - 여러명에게 전달시 최초 오픈 시간, 누구인지는 모름

### 실링왁스

- id
- 실링왁스name
- 이미지 개수 - 추후 유효성 검사

### 편지 글 - 편지의 글이 단락별로 쪼개져서 저장될 예정

- id
- 편지\_id
- text - entity초기 설정시에 mysql varchar length 늘려주는 명령어 필요

### 편지 이미지

- id
- letter_id
- imageUrl - s3저장 주소 url

### 전달 받은 편지[letter]

- id
- Keyringid - 외래키
- 편지 id - 외래키
- 즐겨찾기(boolean)
- 답장text
- 이모지 타입 - enum
- 답장 보낸시간
- 이 사람의 오픈시간(편지 오픈 기준)

### 엽서[**postcards**]

- id
- userId - 작성자
- 퀴즈 질문
- 퀴즈 힌트
- 퀴즈 답
- 보낸시간
- imageUrl - s3저장 주소 url
- CONTENT - 2000 BYTE
- 조건 타입 - enum(예약 전송, 타임캡슐)
- 조건 시간
- 최초 오픈 시간 - 여러명에게 전달시 최초 오픈 시간, 누구인지는 모름

### 전달 받은 엽서[**postcard**]

- id
- Keyringid - 외래키
- 편지 id - 외래키
- 즐겨찾기(boolean)
- 답장text
- 이모지 type - enum
- 답장 보낸시간
- 이 사람의 오픈시간(편지 오픈 기준)

### NFC키링[Keyrings]

- id
- isPurchase - 구매 여부(선택 - UserId null로 체크해도됨)
- UserId - 보낸 사람(구매자)
- NFCName - 받는 사람의 이름
- design - 키링 디자인 넘버(1-우편함)
- price
- 연결된NFC태그값

## SQL 초안

```
create table user
(
    id             bigint auto_increment
        primary key,
    created_at     datetime(6)                                  not null,
    detail_address varchar(255)                                 null,
    email          varchar(255)                                 not null,
    font           enum ('ARIAL', 'COURIER', 'ROBOTO', 'TIMES') not null,
    password       varchar(255)                                 not null,
    phone_number   varchar(255)                                 not null,
    provider       varchar(255)                                 null,
    road_address   varchar(255)                                 null,
    user_nickname  varchar(255)                                 not null,
    constraint UKcr59axqya8utby3j37qi341rm
        unique (user_nickname),
    constraint UKob8kqyqqgmefl0aco34akdtpe
        unique (email)
);

create table keyring
(
    id            bigint auto_increment
        primary key,
    is_purchase   bit            not null,
    price         decimal(38, 2) not null,
    purchase_date datetime(6)    not null,
    tag_code      varchar(255)   not null,
    owner_id      bigint         null,
    recipient_id  bigint         null,
    constraint UKd1cdimeslbg2e2v02g2heb2jj
        unique (tag_code),
    constraint FKexnl7s9fnucat6csd68enysdl
        foreign key (recipient_id) references user (id),
    constraint FKm8im9whrxbigw7l8ffpyhb312
        foreign key (owner_id) references user (id)
);

create table letter
(
    id             bigint auto_increment
        primary key,
    condition_time datetime(6)                                    null,
    condition_type enum ('NONE', 'RESERVATION', 'TIMECAPSULE')    not null,
    content        text                                           not null,
    created_at     datetime(6)                                    not null,
    quiz_answer    varchar(255)                                   null,
    quiz_hint      varchar(255)                                   null,
    quiz_question  varchar(255)                                   null,
    sealing_wax    enum ('CLASSIC', 'MODERN', 'ROYAL', 'VINTAGE') null,
    sender_id      bigint                                         not null,
    constraint FK47ysjx2p94x3yn0khwkx7ew1
        foreign key (sender_id) references user (id)
);

create table letter_image
(
    id        bigint auto_increment
        primary key,
    image_url varchar(255) not null,
    letter_id bigint       not null,
    constraint FKqag669xttauu7wxrtyj753lk2
        foreign key (letter_id) references letter (id)
);

create table letter_recipient
(
    id              bigint auto_increment
        primary key,
    first_opened_at datetime(6) null,
    read_status     bit         null,
    letter_id       bigint      not null,
    recipient_id    bigint      not null,
    constraint FKh15ykdfb6vxurxvvsdyxn052m
        foreign key (recipient_id) references user (id),
    constraint FKt6gwyw65lrn05mj3fb31449mo
        foreign key (letter_id) references letter (id)
);

create table letter_reply
(
    id              bigint auto_increment
        primary key,
    emoji_score     enum ('ANGRY', 'HAPPY', 'LOVE', 'SAD') not null,
    favorite        bit                                    not null,
    reply_sent_time datetime(6)                            not null,
    reply_text      text                                   not null,
    keyring_id      bigint                                 not null,
    letter_id       bigint                                 not null,
    constraint FKkhf6d319ryhmr16ul6g1kcwai
        foreign key (letter_id) references letter (id),
    constraint FKqx8942c0nmq4nxh0133ger5g0
        foreign key (keyring_id) references keyring (id)
);

create table postcards
(
    id             bigint auto_increment
        primary key,
    condition_time datetime(6)                                 null,
    condition_type enum ('NONE', 'RESERVATION', 'TIMECAPSULE') not null,
    image_url      varchar(255)                                not null,
    quiz_answer    varchar(255)                                null,
    quiz_hint      varchar(255)                                null,
    quiz_question  varchar(255)                                null,
    sent_time      datetime(6)                                 not null,
    user_id        bigint                                      not null,
    constraint FK5jfocwvribvgedphsrifivx78
        foreign key (user_id) references user (id)
);

create table postcard_replies
(
    id              bigint auto_increment
        primary key,
    emoji_score     enum ('ANGRY', 'HAPPY', 'LOVE', 'SAD') not null,
    favorite        bit                                    not null,
    reply_sent_time datetime(6)                            not null,
    reply_text      text                                   not null,
    keyring_id      bigint                                 not null,
    postcard_id     bigint                                 not null,
    constraint FK7oieyhnr93rok0pw22r975txw
        foreign key (postcard_id) references postcards (id),
    constraint FKmr2kqghcemwuumrbjcb5f3lkm
        foreign key (keyring_id) references keyring (id)
);


```

## ERD 초안

![ERD](/img/ERD초안.png)
