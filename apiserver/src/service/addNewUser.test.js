const addNewUser = require('./addNewUser');

test("addNewUser callback",()=>{
    let result;
    addNewUser(null, function(a,b){
        result=b;
    })
    expect(result.code).toBe(0);
    expect(result.userId.length).toBe(36);
})