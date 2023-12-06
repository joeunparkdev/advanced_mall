export class RefreshTokenRepository {
  // 생성자에서 prisma를 받아올 수 있도록 수정
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findTokenByUserId(userId) {
    return this.prisma.refreshTokens.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async createToken(userId, token, expirationDate) {
    return this.prisma.refreshTokens.create({
      data: {
        userId: userId,
        token: token,
        expirationDate: expirationDate,
      },
    });
  }

  async deleteTokens(userId) {
    return this.prisma.refreshTokens.deleteMany({
      where: {
        userId: userId,
      },
    });
  }

  async deleteExpiredTokens(userId) {
    await prisma.refreshTokens.deleteMany({
      where: {
        userId: userId,
        expirationDate: {
          lte: new Date(),
        },
      },
    });
  }

}