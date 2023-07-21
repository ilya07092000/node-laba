function F() {
	return F;
}

console.log(new F() instanceof F);
console.log(new F() instanceof Function);
console.log(F.prototype);
