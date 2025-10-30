class AvatarAdapter {
  static generate(userName: string): string {
    return `https://ui-avatars.com/api/?name=${userName}`;
  }
}

export { AvatarAdapter };
