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
  catimg 
  copybuffer 
  copyfile 
  copypath 
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
alias rpissh="~/raspi-connect.sh"
alias cheat=cht.sh
function hyprlog() {
  cat $XDG_RUNTIME_DIR/hypr/$(ls -t $XDG_RUNTIME_DIR/hypr/ | head -n 1)/hyprland.log
}

# Startup stuff
eval "$(zoxide init zsh)"
eval "$(fzf --zsh)"
