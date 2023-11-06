/**
 * ABSTRACT PRODUCT
 */
interface Interviewer {
  askQuestions(): void;
}

/**
 * CONCRETE PRODUCT
 */
class Developer implements Interviewer {
  askQuestions(): void {
    console.log('Developer is asking questions...');
  }
}

/**
 * CONCRETE PRODUCT
 */
class CommunityExecutive implements Interviewer {
  askQuestions(): void {
    console.log('Communitive executive is asking question');
  }
}

/**
 * ABSTRACT CREATOR
 */
abstract class HiringManager {
  abstract makeInterview(): Interviewer;
  abstract takeInterview(): void;
}

/**
 * CONCRETE CREATOR
 */
class DeveloperManager extends HiringManager {
  makeInterview(): Interviewer {
    return new Developer();
  }

  takeInterview(): void {
    this.makeInterview().askQuestions();
  }
}

/**
 * CONCRETE CREATOR
 */
class CommunityManager extends HiringManager {
  makeInterview(): Interviewer {
    return new CommunityExecutive();
  }

  takeInterview(): void {
    this.makeInterview().askQuestions();
  }
}

new DeveloperManager().takeInterview();
