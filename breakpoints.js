const mobile = 375;
const tablet = 768;
const laptop = 1024;
const wide = 1440;

module.exports = {
  mobile,
  tablet,
  laptop,
  wide,
  customMedia: {
    "--mobile": `(min-width: ${mobile}px)`,
    "--tablet": `(min-width: ${tablet}px)`,
    "--laptop": `(min-width: ${laptop}px)`,
    "--wide": `(min-width: ${wide}px)`,
  },
};
