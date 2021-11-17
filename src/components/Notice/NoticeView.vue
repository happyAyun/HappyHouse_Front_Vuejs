<template>
  <div>
    <div id="content-wrapper">
      <div class="p-5">
        <div class="container mt-5">
          <h4>공지사항 조회</h4>
          <table class="table table-bordered mt-4">
            <tbody>
              <tr>
                <th class="table-dark col-4">작성자</th>
                <td>${article.userId}</td>
              </tr>
              <tr>
                <th class="table-dark col-4">제목</th>
                <td>${article.subject}</td>
              </tr>
              <tr>
                <th class="table-dark col-4">내용</th>
                <td>${article.content}</td>
              </tr>
            </tbody>
          </table>
          <div class="mb-5 col-lg-10">
            <button
              type="button"
              id="mvlistBtn"
              class="btn btn-primary float-right"
            >
              목록이동
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
