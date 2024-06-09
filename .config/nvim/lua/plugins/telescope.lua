return {
    'nvim-telescope/telescope.nvim', 
    tag = '0.1.6', 
    dependencies = { 'nvim-lua/plenary.nvim' },
    config = function()
        require"telescope".load_extension "project"
        require"telescope".load_extension "file_browser"

        local builtin = require('telescope.builtin')
        vim.keymap.set('n', '<space>tf', builtin.find_files, {})
        vim.keymap.set('n', '<space>tg', builtin.live_grep, {})
        vim.keymap.set('n', '<space>tb', ":Telescope file_browser <CR>", {})
        vim.keymap.set('n', '<space>tp', ":Telescope project <CR>", {})
    end
}