# ZSH stuff
export ZSH="$HOME/.oh-my-zsh"
zstyle ':omz:update' frequency 4

ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"
DISABLE_UNTRACKED_FILES_DIRTY="true"
plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting zsh-autocomplete)

source $ZSH/oh-my-zsh.sh

if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='nvim'
else
  export EDITOR='mvim'
fi

# Aliases and functions
alias rpissh="~/raspi-connect.sh"
function hyprlog() {
  cat $XDG_RUNTIME_DIR/hypr/$(ls -t $XDG_RUNTIME_DIR/hypr/ | head -n 1)/hyprland.log
}

# Pure theme
fpath+=($HOME/.zsh/pure)
autoload -U promptinit; promptinit
prompt pure

zstyle ':prompt:pure:prompt:success' color green
zstyle ':prompt:pure:prompt:error' color red

# Startup stuff
eval "$(zoxide init zsh)"