import { BaseEntity } from "typeorm";

export class BaseEntityWrapper extends BaseEntity {
  async isValid(): Promise<boolean> {
    const validations = Object.keys(this).filter((key) =>
      /^validate[A-Z]/.test(key),
    );
    for (const validation of validations) {
      if (!(await this[validation as keyof this]())) {
        return false;
      }
    }
    return true;
  }
}
