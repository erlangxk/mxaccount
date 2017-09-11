import createServiceImpl from './service';

function mockRegister(name, password) {
    if (name === "xxxx") {
        return Promise.resolve("id");
    } else {
        return Promise.reject(new Error("something is wrong"));
    }
}
describe("test grpc server with mock impl", () => {
    test("add new user successfully", (done) => {
        const service = createServiceImpl({
            register: mockRegister
        });
        const call = {
            request: {
                name: "xxxx",
                password: "yyyy",
            }
        };
        service.addNewUser(call, function (err, result) {
            expect(err).toBeNull();
            expect(result.code).toBe(0);
            expect(result.userId).toBe("id");
            done();
        })
    });

    test("add new user failed", (done) => {
        const service = createServiceImpl({
            register: mockRegister
        });
        const call = {
            request: {
                name: "xxxxk",
                password: "yyyy",
            }
        };
        service.addNewUser(call, function (err, result) {
            expect(err).toBeNull();
            expect(result.code).toBe(1);
            done();
        })
    });
});