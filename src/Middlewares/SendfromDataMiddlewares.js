import axios from "axios";

const token = localStorage.getItem("user_token");

const _axios = axios.create({
	baseURL: 'http://localhost/api',
	timeout: 30000,
	headers: {
		'Content-Type': 'multipart/form-data',
		'Access-Control-Allow-Origin': '*',
		'Authorization': `bearer ${token}`
	}
})

const fetch = store => next => action => {
	switch (action.type) {
		case "POST_AddMeeting":
			_axios
				.post('/meeting', action.payload)
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						console.log("新增成功");
					}
				})
				.catch(err => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		case "POST_UpdateMeeting":
			_axios
				.post('/meeting', action.payload)
				.then(response => {
					console.log(response)
					if (response.status === 200) {
						console.log("修改成功")
					}
				})
				.catch((err) => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		case "POST_AddProjectRecord":
			_axios
				.post('/project/record', action.payload)
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						console.log("新增專案記錄成功");
					}
				})
				.catch(err => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		case "POST_UpdateProjectRecord":
			_axios
				.post('/project/record', action.payload)
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						console.log("更新專案記錄成功");
					}
				})
				.catch(err => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		case "POST_AddAlbum":
			_axios
				.post('/album', action.payload)
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						console.log("新增相片成功");
					}
				})
				.catch(err => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		case "POST_UpdataAlbum":
			_axios
				.post('/album', action.payload)
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						console.log("修改相片成功");
					}
				})
				.catch(err => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		case "POST_UpdatePhoto":
			_axios
				.post('/manager/teacher/photo', action.payload)
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						console.log("修改教師大頭貼成功");
					}
				})
				.catch(err => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		case "POST_UpdateBookPhoto":
			_axios
				.post('/book/image', action.payload)
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						console.log("修改出版品圖片成功");
					}
				})
				.catch(err => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		case "POST_UpdateMyPhoto":
			_axios
				.post('/member/photo', action.payload)
				.then(response => {
					console.log(response);
					if (response.status === 200) {
						console.log("修改個人大頭貼成功");
					}
				})
				.catch(err => {
					alert(err.response.data.message);
					throw new Error(err);
				})
				.then(json => {
					if (action.callback) {
						action.callback(json)
					}
				});
			break;
		default:
			break;
	}
	return next(action);
};

export default fetch;
