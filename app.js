let userName;

const httpRequest = (endpoint, values, method, callback) => {
    $.ajax({
        url: endpoint,
        type: method,
        data:  values,
        success: function (response) {
           callback(response)
        },
        error: function(textStatus, errorThrown) {
            alert("An error occurred")
           console.log(textStatus, errorThrown);
        }
    });
}

const formatUsersResult = (data) => {
    const list = document.querySelector('#usersList')

    const tableData = data.map((user) => {
        return `
            <tr>
            <td>${user.name}</td>
            <td><button data-btn="${user.id}" data-username="${user.name}">View post</button</td>
            </tr>
        `;
    })
    .join('');
    list.innerHTML = tableData

    // add click event to button
    addClickEventToButton()

}


const addClickEventToButton = () => {
    const allButtons = document.querySelectorAll('[data-btn]');
    for (const button of allButtons) {
        button.addEventListener('click', (e) => {
            getUsersPost(e)
        })
    }
}

const formatUserPost = (data) => {

    const postList = document.querySelector('#postListing');
    console.log(data)

    const tableData = data.map((post) => {
        return `
            <ul>
                <li><span>Title</span>: ${post.title}</li>
                <li><span>Body</span>: ${post.body}</li>
            </ul>
        `;
    })
    .join('');
    postList.innerHTML = tableData
    

}
 
const getUsersPost = (e) => {
    document.getElementById('postListing').innerHTML = ''
    const userId = e.target.getAttribute('data-btn');
    httpRequest(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        null,
        "GET",
        formatUserPost
    )
    
}

httpRequest(
    'https://jsonplaceholder.typicode.com/users',
    null,
    'GET',
    formatUsersResult
)