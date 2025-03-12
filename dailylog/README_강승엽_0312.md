# 강승엽 TODO

### 250312

- [x] 현직자 리뷰
- [x] ERD 완성
- [x] API 명세서 작성
- [x] 연관관계 설정

## ERD 완성

![ERD](/img/ERD최종.png)

## 연관관계 설정

```
create table keyring_design
(
    id          bigint auto_increment
        primary key,
    design_name varchar(255)   not null,
    image_url   varchar(255)   null,
    price       decimal(38, 2) not null
);

create table sealing_wax
(
    id               bigint auto_increment
        primary key,
    image_count      int          not null,
    image_url        varchar(255) not null,
    sealing_wax_name varchar(255) not null
);

create table user
(
    id             bigint auto_increment
        primary key,
    created_at     datetime(6)                                  not null,
    detail_address varchar(255)                                 null,
    email          varchar(255)                                 not null,
    font           enum ('ARIAL', 'COURIER', 'ROBOTO', 'TIMES') null,
    password       varchar(255)                                 not null,
    phone_number   varchar(255)                                 null,
    provider       varchar(255)                                 null,
    real_name      varchar(255)                                 null,
    road_address   varchar(255)                                 null,
    user_nickname  varchar(255)                                 not null,
    constraint UKob8kqyqqgmefl0aco34akdtpe
        unique (email)
);

create table keyring
(
    id          bigint auto_increment
        primary key,
    is_purchase bit          not null,
    nfc_name    varchar(255) not null,
    tag_code    varchar(255) not null,
    design_id   bigint       not null,
    owner_id    bigint       null,
    constraint UKd1cdimeslbg2e2v02g2heb2jj
        unique (tag_code),
    constraint FKivqgdu5ibhj6tvn2vopb58f7b
        foreign key (design_id) references keyring_design (id),
    constraint FKm8im9whrxbigw7l8ffpyhb312
        foreign key (owner_id) references user (id)
);

create table letter
(
    id                bigint auto_increment
        primary key,
    condition_time    datetime(6)                                 null,
    condition_type    enum ('NONE', 'RESERVATION', 'TIMECAPSULE') not null,
    first_opened_time datetime(6)                                 null,
    quiz_answer       varchar(255)                                null,
    quiz_hint         varchar(255)                                null,
    quiz_question     varchar(255)                                null,
    sent_time         datetime(6)                                 not null,
    sealing_wax_id    bigint                                      not null,
    sender_id         bigint                                      not null,
    constraint FK47ysjx2p94x3yn0khwkx7ew1
        foreign key (sender_id) references user (id),
    constraint FKojiwqlemst3o3f1pc2p7ncmdo
        foreign key (sealing_wax_id) references sealing_wax (id)
);

create table letter_content
(
    id        bigint auto_increment
        primary key,
    text      varchar(3000) not null,
    letter_id bigint        not null,
    constraint FKqay6gma17kmuwkcqyyy1uvaw5
        foreign key (letter_id) references letter (id)
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

create table postcard
(
    id                bigint auto_increment
        primary key,
    condition_time    datetime(6)                                 null,
    condition_type    enum ('NONE', 'RESERVATION', 'TIMECAPSULE') not null,
    content           varchar(3000)                               not null,
    first_opened_time datetime(6)                                 null,
    image_url         varchar(255)                                not null,
    quiz_answer       varchar(255)                                null,
    quiz_hint         varchar(255)                                null,
    quiz_question     varchar(255)                                null,
    sent_time         datetime(6)                                 not null,
    user_id           bigint                                      not null,
    constraint FKq8grs6fa6vbqvkhrt4x225uu4
        foreign key (user_id) references user (id)
);

create table received_letter
(
    id              bigint auto_increment
        primary key,
    emoji_type      enum ('ANGRY', 'HAPPY', 'LOVE', 'SAD') not null,
    favorite        bit                                    not null,
    open_time       datetime(6)                            null,
    reply_sent_time datetime(6)                            not null,
    reply_text      text                                   not null,
    keyring_id      bigint                                 not null,
    letter_id       bigint                                 not null,
    constraint FKb3q6tl48a246t127j45kps2ap
        foreign key (letter_id) references letter (id),
    constraint FKf3kseiiq4lk1id3w4cqxp82tw
        foreign key (keyring_id) references keyring (id)
);

create table received_postcard
(
    id              bigint auto_increment
        primary key,
    emoji_type      enum ('ANGRY', 'HAPPY', 'LOVE', 'SAD') not null,
    favorite        bit                                    not null,
    open_time       datetime(6)                            null,
    reply_sent_time datetime(6)                            not null,
    reply_text      text                                   not null,
    keyring_id      bigint                                 not null,
    postcard_id     bigint                                 not null,
    constraint FK2demf00ea34xshtxma3c3hg8y
        foreign key (postcard_id) references postcard (id),
    constraint FK83gaie56n21jsg55xg9d1id0n
        foreign key (keyring_id) references keyring (id)
);


```

## API 설계 - 페이지별 API CRUD 설계

## 받는 사람

- **페이지 설명**
  - 랜딩화면: 새로운 편지가 있을 때, 편지봉투로 시작함

    - **조회 (Read):**
      - 현재 사용자(세션 기준)의 새 편지(아직 오픈하지 않은 편지 등)의 간략 정보(편지 ID, 보낸 사람, 조건 타입/시간 등)를 조회

  - 메인화면: 새로 온 편지가 없다면, 편지 목록을 보여줌
    - **조회 (Read):**
      - 현재 사용자의 모든 편지 목록(수신/발신 여부에 따라)을 조회하여 목록으로 제공
  - 편지상세: 편지에 내용을 확인함
    - **조회 (Read):**
      - 선택한 편지의 전체 내용(단락별 텍스트, 이미지, 퀴즈 정보, 조건 정보, 실링왁스 등)을 조회합니다.
    - **업데이트 (Update):**
      - 편지의 읽음 상태, 최초 오픈 시간 등 사용자가 편지를 열람했을 때 관련 메타데이터(예: 첫 오픈 시간)를 업데이트할 수 있습니다.
    - ~~(일반적으로 편지 자체를 생성/삭제하는 작업은 편지쓰기나 관리 API에서 다룹니다.)~~
  - 답장: 편지에 대한 답장을 작성, 이모지 선택, 짧은 글 작성
    - **생성 (Create):**
      - 사용자가 작성한 답장을 새로 등록합니다.
    - **조회 (Read):**
      - 답장 목록(편지 상세 화면에서 답장 목록을 보여줄 경우)을 조회할 수 있습니다.
    - **~~수정/삭제 (Update/Delete):~~**
      - ~~일반적으로 답장은 작성 후 수정이나 삭제가 제한될 수 있습니다. 만약 답장 수정/삭제 기능이 필요하다면, 추가 API로 제공할 수 있습니다.~~

## 보내는 사람

- **페이지 설명**
  - ~~비회원 랜딩화면: 회원이 아닌 사람에게 우리 서비스를 소개(키링 설명 포함)~~

  - 키링 구매: 키링 구매를 위한 결제, 배송지 정보를 입력받음
    - **생성 (Create):** 새로운 키링 생성
  - 메인화면: 우체통으로 시작하는 우리 화면, 서비스로 이동하는 버튼 포함
    - **조회 (Read):** 현재 사용자의 편지 목록 조회
  - 로그인, 회원가입
    - **회원가입 (Create User):** 새 사용자 등록
    - **로그인 (Authentication):** 사용자 로그인 및 세션 생성
  - 마이페이지: 폰트 설정, 키링ID 이름 설정, 내 닉네임 설정 등 관리
    - **조회 (Read):** 내 정보 조회
    - **수정 (Update):** 내 정보 업데이트
  - ~~테마선택: 실링왁스로 편지 디자인 테마를 선택함~~

  - 편지쓰기: 템플릿 기반 편지 작성
    - **생성 (Create):** 새 편지 작성
      - 편지 작성 시, 단락별 본문(여러 LetterContent), 이미지(LetterImage) 등이 함께 저장됩니다.
  - 보낸편지함: 내가 보낸 편지를 확인, 답장 이모지, 최초 오픈 시간 등 확인 가능
    - **조회 (Read):** 내가 보낸 편지 목록 조회
  - 편지상세: 내가 쓴 편지의 상세, 이 편지에 달린 답장(각 오픈시간)을 확인 가능
    - **조회 (Read):** 특정 편지의 상세 정보 조회
    - **업데이트 (Update):** 편지 읽음 상태나 최초 오픈 시간 업데이트 (필요한 경우)
