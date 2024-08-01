# ZSH stuff
export ZSH="$HOME/.oh-my-zsh"
zstyle ':omz:update' frequency 4
zstyle ':prompt:pure:prompt:success' color green
zstyle ':prompt:pure:prompt:error' color red
fpath+=($HOME/.zsh/pure)
autoload -U promptinit; promptinit
prompt pure
plugins=(
  git
  fzf
  zsh-autosuggestions
  zsh-syntax-highlighting
  fast-syntax-highlighting
  zsh-autocomplete
)
source $ZSH/oh-my-zsh.sh

# Default editor
if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='nvim'
else
  export EDITOR='nvim'
fi

# Aliases and functions
alias icat="kitten icat"
alias kdiff="kitten diff"
alias unicode="kitty +kitten unicode_input"
alias hypergrep="kitten hyperlinked-grep"
alias broadcast="kitty +kitten broadcast"
alias panel="kitty +kitten panel"
alias clip="kitten clipboard"
alias l5="eza -1 --icons=always --hyperlink --git -l --no-permissions --no-user --git-repos"

alias matrix="cmatrix -b -C blue"
alias pipes="pipes.sh -p 42 -f 80 -s 12 -r 0 -R"
alias rpissh="~/raspi-connect.sh"
alias cheat=cht.sh

function hyprlog() {
  watch -n 0.1 "grep -v \"arranged\" $XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/hyprland.log | tail -n 40"
}

# Startup stuff
eval "$(zoxide init zsh)"
eval "$(fzf --zsh)"
eval "$(thefuck --alias asdf)"
eval "$(atuin init zsh)"
export PATH=$HOME/.local/bin:$PATH
