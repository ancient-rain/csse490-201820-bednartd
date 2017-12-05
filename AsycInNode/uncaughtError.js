function a() {
    throw new Error("You can't catch me!");
}

function b() {
    a();
}

function c() {
    b();
}

c();
