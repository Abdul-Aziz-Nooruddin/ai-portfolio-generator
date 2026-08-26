/**
 * 🏛️ Error Recovery Service (Phase 32)
 * Centralized user-facing error mapping system.
 * Translates technical exceptions, HTTP status codes, and parser failures into
 * clear, actionable, human-friendly guidance without leaking internal stack traces or paths.
 */

class ErrorRecoveryService {
  /**
   * Maps any raw error or status into a user-facing explanation
   * @param {Error|Object|string} error 
   * @param {string} context - 'github' | 'resume' | 'image' | 'generation' | 'customizer' | 'export'
   * @returns {{ whatHappened: string, why: string, whatYouCanDo: string, isRetryable: boolean, primaryAction: string, secondaryAction: string }}
   */
  static mapError(error, context = 'general') {
    const rawMessage = (typeof error === 'string' ? error : error?.message || error?.error || '').toLowerCase();
    const status = error?.status || error?.statusCode || 0;

    // 1. GitHub API Errors
    if (context === 'github' || rawMessage.includes('github') || rawMessage.includes('user not found') || rawMessage.includes('rate limit')) {
      if (status === 404 || rawMessage.includes('not found') || rawMessage.includes('404')) {
        return {
          whatHappened: "We couldn't find that GitHub account.",
          why: "The username may be misspelled, or the account is private / deactivated.",
          whatYouCanDo: "Double-check the username or continue by uploading your resume or answering a few questions.",
          isRetryable: true,
          primaryAction: "Re-enter Username",
          secondaryAction: "Upload Resume Instead"
        };
      }
      if (status === 403 || status === 429 || rawMessage.includes('rate limit') || rawMessage.includes('secondary rate')) {
        return {
          whatHappened: "GitHub is temporarily limiting requests.",
          why: "The public GitHub API rate limit has been reached for this IP address.",
          whatYouCanDo: "Wait 60 seconds and try again, or build your portfolio instantly using your resume or quick questions.",
          isRetryable: true,
          primaryAction: "Try Again",
          secondaryAction: "Continue with Resume"
        };
      }
      if (rawMessage.includes('timeout') || rawMessage.includes('econnrefused') || rawMessage.includes('fetch failed')) {
        return {
          whatHappened: "Could not reach GitHub right now.",
          why: "A temporary network disruption occurred while connecting to GitHub.",
          whatYouCanDo: "Check your internet connection and retry, or use the guided question builder.",
          isRetryable: true,
          primaryAction: "Retry Connection",
          secondaryAction: "Answer Questions"
        };
      }
    }

    // 2. Resume / PDF Errors
    if (context === 'resume' || rawMessage.includes('pdf') || rawMessage.includes('resume')) {
      if (rawMessage.includes('exceeds') || rawMessage.includes('size') || rawMessage.includes('10 mb')) {
        return {
          whatHappened: "Resume file is too large.",
          why: "Uploaded PDF files must be 10 MB or smaller to ensure fast processing.",
          whatYouCanDo: "Compress your PDF or upload a version under 10 MB.",
          isRetryable: true,
          primaryAction: "Select Another PDF",
          secondaryAction: "Paste Details Manually"
        };
      }
      if (rawMessage.includes('magic headers') || rawMessage.includes('format') || rawMessage.includes('invalid file')) {
        return {
          whatHappened: "This file does not appear to be a valid PDF.",
          why: "The file is missing the standard PDF header structure or may be corrupted.",
          whatYouCanDo: "Please upload a genuine PDF file exported directly from your editor or word processor.",
          isRetryable: true,
          primaryAction: "Choose Valid PDF",
          secondaryAction: "Start with GitHub"
        };
      }
      if (rawMessage.includes('pages') || rawMessage.includes('5 pages')) {
        return {
          whatHappened: "Resume has too many pages.",
          why: "Portfolios work best with concise resumes of 5 pages or fewer.",
          whatYouCanDo: "Upload a summarized resume (1-5 pages) or select key projects manually.",
          isRetryable: true,
          primaryAction: "Upload Short Resume",
          secondaryAction: "Continue with Questions"
        };
      }
    }

    // 3. Image / Visual Material Errors
    if (context === 'image' || rawMessage.includes('image') || rawMessage.includes('photo')) {
      if (rawMessage.includes('exceeds') || rawMessage.includes('5 mb')) {
        return {
          whatHappened: "Image file exceeds the 5 MB limit.",
          why: "To keep your portfolio fast and lightweight, each image must be under 5 MB.",
          whatYouCanDo: "Resize or compress the image before uploading.",
          isRetryable: true,
          primaryAction: "Select Smaller Image",
          secondaryAction: "Skip Photo"
        };
      }
      if (rawMessage.includes('format') || rawMessage.includes('unsupported') || rawMessage.includes('signature')) {
        return {
          whatHappened: "Unsupported image format.",
          why: "Only genuine JPEG, PNG, and WebP images are supported.",
          whatYouCanDo: "Convert your image to PNG or JPEG and try again.",
          isRetryable: true,
          primaryAction: "Upload JPEG/PNG/WebP",
          secondaryAction: "Skip Photo"
        };
      }
      if (rawMessage.includes('maximum 3') || rawMessage.includes('count')) {
        return {
          whatHappened: "Maximum image count reached.",
          why: "You can showcase up to 3 high-impact supporting images in your portfolio.",
          whatYouCanDo: "Remove an existing image to upload a new one.",
          isRetryable: true,
          primaryAction: "Manage Images",
          secondaryAction: "Proceed with Current Images"
        };
      }
    }

    // 4. Generation Pipeline Errors
    if (context === 'generation' || rawMessage.includes('generation') || rawMessage.includes('synthesize')) {
      return {
        whatHappened: "We encountered a temporary hiccup building your portfolio.",
        why: "One of the design synthesis stages took longer than expected or received conflicting parameters.",
        whatYouCanDo: "All your entered information has been safely preserved. Click 'Try Again' to re-synthesize.",
        isRetryable: true,
        primaryAction: "Try Again",
        secondaryAction: "Review Inputs"
      };
    }

    // 5. Static Export Errors
    if (context === 'export' || rawMessage.includes('export') || rawMessage.includes('zip')) {
      return {
        whatHappened: "Could not package static ZIP file.",
        why: "A temporary storage error occurred while bundling your offline static site.",
        whatYouCanDo: "Your live portfolio is unaffected. Try clicking Export again.",
        isRetryable: true,
        primaryAction: "Retry Export",
        secondaryAction: "Open Live Preview"
      };
    }

    // 6. General Fallback Error (Sanitized)
    return {
      whatHappened: "Unable to complete request.",
      why: "An unexpected condition occurred. Your data has been preserved.",
      whatYouCanDo: "Please retry the action or return to the main builder.",
      isRetryable: true,
      primaryAction: "Retry",
      secondaryAction: "Return to Home"
    };
  }

  /**
   * Sanitizes any raw error string to ensure zero filesystem paths, API tokens, or URLs leak
   * @param {string} text
   * @returns {string} Sanitized text
   */
  static sanitizeErrorText(text = '') {
    if (!text) return '';
    return String(text)
      .replace(/\/Users\/[^\s/]+/g, '[system-path]')
      .replace(/C:\\[^\s\\]+/g, '[system-path]')
      .replace(/Bearer\s+[a-zA-Z0-9_\-.]+/gi, '[token]')
      .replace(/ghp_[a-zA-Z0-9]{20,}/g, '[token]')
      .replace(/http:\/\/localhost:\d+/g, '[local-service]')
      .replace(/http:\/\/127\.0\.0\.1:\d+/g, '[local-service]');
  }
}

module.exports = { ErrorRecoveryService };
