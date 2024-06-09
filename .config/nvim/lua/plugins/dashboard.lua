return {
    'nvimdev/dashboard-nvim',
    event = 'VimEnter',
    dependencies = {
        {'nvim-tree/nvim-web-devicons'}
    },
    config = function()
        require('dashboard').setup {
            theme = 'doom',
            shortcut_type = 'number',
            config = {
                header = {
                    "                                                       ",
                    "                                                       ",
                    "                                                       ",
                    "                                                       ",
                    "                                                       ",
                    " ███╗   ██╗ ███████╗ ██████╗  ██╗   ██╗ ██╗ ███╗   ███╗",
                    " ████╗  ██║ ██╔════╝██╔═══██╗ ██║   ██║ ██║ ████╗ ████║",
                    " ██╔██╗ ██║ █████╗  ██║   ██║ ██║   ██║ ██║ ██╔████╔██║",
                    " ██║╚██╗██║ ██╔══╝  ██║   ██║ ╚██╗ ██╔╝ ██║ ██║╚██╔╝██║",
                    " ██║ ╚████║ ███████╗╚██████╔╝  ╚████╔╝  ██║ ██║ ╚═╝ ██║",
                    " ╚═╝  ╚═══╝ ╚══════╝ ╚═════╝    ╚═══╝   ╚═╝ ╚═╝     ╚═╝",
                    "                                                       ",
                    "                                                       ",
                    "                                                       ",
                    "                                                       ",
                },
                packages = { enable = true },
                shortcut = {
                    { desc = '󰚰 Update', group = 'Label', action = 'Lazy update', key = 'u' },
                    { desc = ' Files', group = 'Number', action = 'Telescope find_files', key = 'f' },
                    { desc = ' Planets', group = 'Number', action = 'Telescope planets', key = 'p' },
                },
                center = {
                    {
                        icon = "󰈞  ",
                        desc = "Find  File                              ",
                        action = "Telescope find_files",
                        key = "<space>ff",
                    },
                    {
                        icon = "  ",
                        desc = "New file                                ",
                        action = "enew",
                        key = "<space>fn",
                    },
                    {
                        icon = "  ",
                        desc = "Find folder                             ",
                        action = "Telescope file_browser",
                        key = "<space>Ff",
                    },
                    {
                        icon = "  ",
                        desc = "Navigate to project                     ",
                        action = "Telescope project",
                        key = "<space>pn",
                    },
                    {
                        icon = "󰚰  ",
                        desc = "Update Lazy                             ",
                        action = "Lazy update",
                        key = "u",
                    },
                    {
                        icon = "󰗼  ",
                        desc = "Quit Nvim                               ",
                        action = "qa",
                        key = "q",
                    }, 
                }
            }
        }
        vim.keymap.set('n', '<C-d>', ':Dashboard <CR>', {})
    end,
}