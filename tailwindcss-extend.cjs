const handler = (api) => {
  api.addComponents({
    '.hyperce-head-xl': { '@apply font-extrabold text-4xl md:text-6xl': true },
    '.hyperce-sub-head': { '@apply font-medium text-base md:text-lg': true },
    '.hyperce-head-sup': { '@apply text-sm font-semibold': true },
    '.hyperce-card-header': { '@apply text-lg md:text-xl font-bold': true },
    '.hyperce-card-description': {
      '@apply text-xs md:text-sm font-medium': true,
    },
    '.hyperce-btn-text-low': { '@apply text-base font-bold': true },
    '.hyperce-btn-text-high': { '@apply text-lg font-bold': true },
  });
};

const config = {};

module.exports = {
  handler,
  config,
};
