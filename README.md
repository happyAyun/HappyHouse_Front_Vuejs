# Vue 관통

<hr/>

## 폴더 구조

![src1](https://user-images.githubusercontent.com/63468607/142263292-34b3b2a7-d938-4318-8106-6e6b581dba5b.JPG)
![src2](https://user-images.githubusercontent.com/63468607/142263294-f97a7f83-70f4-42cb-b4b4-cf9d03ed60cf.JPG)

<hr/>

## QnA 게시판

### 리스트

![qna리스트](https://user-images.githubusercontent.com/63468607/142263222-c0c8096c-e057-41bf-9d82-38a518be1257.png)

> 처음 들어오면 작성된 게시글들을 출력합니다.

![qna리스트-컨트롤러](https://user-images.githubusercontent.com/63468607/142263224-8f0f006b-2950-4906-91fe-74b5ab58bcdd.JPG)
![qna리스트-쿼리](https://user-images.githubusercontent.com/63468607/142263227-6bce5e29-ba97-4ad9-917c-ec672f799b8f.JPG)

> 게시글 리스트의 컨트롤러와 쿼리문 입니다.

### 글 등록

![qna작성1](https://user-images.githubusercontent.com/63468607/142263261-f0d73ef4-20a7-433c-90e0-8f2d3f499811.png)
![qna작성2](https://user-images.githubusercontent.com/63468607/142263263-8d69ca20-a6e6-4ea7-a33f-2bd4e87e9c58.png)
![qna작성3](https://user-images.githubusercontent.com/63468607/142263264-834b6895-313f-4c48-9491-8d29e2198d55.png)

> 글쓰기 버튼을 눌러 작성 페이지로 이동 후 글작성 버튼을 누르면 작성이 됩니다.

![qna등록-컨트롤러](https://user-images.githubusercontent.com/63468607/142263214-0e24ecaa-e210-4e62-a9ab-085bc6d312a9.JPG)
![qna등록-쿼리](https://user-images.githubusercontent.com/63468607/142263221-0f7ec353-6121-44a3-bbb5-5d3c84b7c0fc.JPG)

> 게시글 등록 컨트롤러와 쿼리문입니다.

### 상세 보기

![qna뷰](https://user-images.githubusercontent.com/63468607/142263228-66ec02fb-ac2a-4a66-aa5a-064175f10003.png)

> _(현재 로그인 기능을 미구현한 상태여서 작성자는 출력되지 않습니다.)_  
> 글 목록에서 글을 누르게 되면 상세 페이지로 이동합니다.

![qna뷰-컨트롤러](https://user-images.githubusercontent.com/63468607/142263229-df7347e9-a63b-484a-adcb-3bd059420194.JPG)
![qna상세-쿼리](https://user-images.githubusercontent.com/63468607/142263248-aa446a7b-2c89-4d0f-88f1-2599443eb50d.JPG)

> 상세 페이지 컨트롤러와 쿼리문 입니다.

### 게시글 수정

![qna수정1](https://user-images.githubusercontent.com/63468607/142263252-9e98947a-751b-4758-bea6-025d9bed7e0c.png)
![qna수정2](https://user-images.githubusercontent.com/63468607/142263254-82511b12-61a2-44eb-892d-615f707265be.png)

> 기존 상세페이지 에서 글 수정 버튼을 클릭하여 수정 페이지로 넘어간 후  
> 글작성 버튼을 누르게 되면 내용이 수정 됩니다.

![qna수정-컨트롤러](https://user-images.githubusercontent.com/63468607/142263257-4f6ed3d9-a259-4104-969f-e5a9ababdcbb.JPG)
![qna수정-쿼리](https://user-images.githubusercontent.com/63468607/142263259-8cb8b0ae-d197-4a7d-b208-50bd74e31fb5.JPG)

> 게시글 수정 컨트롤러와 쿼리문입니다.

### 게시글 삭제

![qna삭제1](https://user-images.githubusercontent.com/63468607/142263232-33bfdf8f-8440-4f9a-8821-100a28c5c235.png)
![qna삭제2](https://user-images.githubusercontent.com/63468607/142263235-da071f79-2729-438d-ad42-524919b240ab.png)
![qna삭제3](https://user-images.githubusercontent.com/63468607/142263238-848a4951-ef10-4620-b741-5af8380b4eae.png)

> 기존 상세 페이지에서 글삭제 버튼을 누르게 되면 답변이 달려 있더라도 같이 삭제 됩니다.

![qna삭제-컨트롤러](https://user-images.githubusercontent.com/63468607/142263241-24504bfc-f4d1-4f40-bea9-4f1f771cbde8.JPG)
![qna삭제-쿼리](https://user-images.githubusercontent.com/63468607/142263245-a45c648b-0837-4718-9949-f54439d3d96e.JPG)

> 게시글삭제 컨트롤러와 쿼리문입니다.

<hr/>

## 답변

<hr/>

### 답변 작성

![re작성1](https://user-images.githubusercontent.com/63468607/142263288-82d9ec99-4932-4f9a-8bd7-51e940947527.png)
![re작성2](https://user-images.githubusercontent.com/63468607/142263290-9160d2a9-646d-410f-bb61-46db40c73fea.png)

> 기존 상세페이지 에서 답변 내용을 입력하고 작성하기 버튼 클릭 시 해당 내용이 답변으로 등록 됩니다.
> _(현재 로그인 미구현으로 작성자 아이디는 뜨지 않게 했습니다.)_

![re등록-컨트롤러](https://user-images.githubusercontent.com/63468607/142263265-4166eb60-e844-444e-be04-31825aa1fb88.JPG)
![re등록-쿼리](https://user-images.githubusercontent.com/63468607/142263269-d8b1a09b-feed-49d1-b148-5dc2d4da1a99.JPG)

> 답변 작성 컨트롤러와 쿼리문 입니다.

### 답변 수정

> _글 작성 시점 (21.11.18 04:04AM) 현재 난관에 봉착하여 수정 부분을 미완하였습니다.._
> ![re수정-컨트롤러](https://user-images.githubusercontent.com/63468607/142263283-d835da34-7bc0-4855-8d52-ae679a623206.JPG)
> ![re수저-쿼리](https://user-images.githubusercontent.com/63468607/142263280-17f234e2-4be5-4cc2-9c81-40356ac4f9f4.JPG)

> 답변 수정 컨트롤러와 쿼리문입니다.

### 답변 삭제

![re삭제1](https://user-images.githubusercontent.com/63468607/142263273-22b0baf1-0bdd-44b1-bb4a-509293e54bbb.png)
![re삭제2](https://user-images.githubusercontent.com/63468607/142263274-ad9182d9-900d-4932-8792-28ec0a07e0cb.png)

> _(이 부분 역시 로그인이 미 구현이라 작성자만 삭제 하는 기능은 구현하지 않았습니다.)_
> 기존 상세 페이지의 답변 목록에서 삭제 버튼을 클릭하면 답변이 삭제됩니다.

![re삭제-컨트롤러](https://user-images.githubusercontent.com/63468607/142263276-214f6cbb-d39b-4b5a-a959-9e720b3d6494.JPG)
![re삭제-쿼리](https://user-images.githubusercontent.com/63468607/142263277-58a05bcc-1c89-4136-9d6c-6715da78f7aa.JPG)

> 답변 삭제 컨트롤러와 쿼리문 입니다.
