import React from 'react';

interface MathTextProps {
  text: string;
  className?: string;
  scale?: number;
}

const MathText: React.FC<MathTextProps> = ({ text, className = "", scale = 1 }) => {
  // 1. Handle Fractions Regex
  // Matches: "1 1/2" or "1/2"
  // Note: We process underlines specifically in the "text parts" of the fraction split logic,
  // or we handle formatting first. 
  // To keep it simple, we'll split by fraction first, then process formatting in the text chunks.
  
  const fractionRegex = /(?:(\d+)\s+)?(\d+)\/(\d+)/g;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  // Helper to process text formatting (underscores for underline)
  const formatText = (rawText: string, keyPrefix: string) => {
    // Regex for _word_ to underline
    const formatRegex = /_([^_]+)_/g;
    const formattedParts: React.ReactNode[] = [];
    let lastFormatIndex = 0;
    let formatMatch;

    while ((formatMatch = formatRegex.exec(rawText)) !== null) {
      if (formatMatch.index > lastFormatIndex) {
        formattedParts.push(
          <span key={`${keyPrefix}-txt-${lastFormatIndex}`}>
            {rawText.substring(lastFormatIndex, formatMatch.index)}
          </span>
        );
      }
      // The underlined part
      formattedParts.push(
        <span key={`${keyPrefix}-u-${formatMatch.index}`} className="underline decoration-2 md:decoration-4 underline-offset-4 decoration-yellow-400">
          {formatMatch[1]}
        </span>
      );
      lastFormatIndex = formatRegex.lastIndex;
    }
    
    if (lastFormatIndex < rawText.length) {
      formattedParts.push(
        <span key={`${keyPrefix}-txt-end`}>
          {rawText.substring(lastFormatIndex)}
        </span>
      );
    }

    return formattedParts;
  };

  while ((match = fractionRegex.exec(text)) !== null) {
    // Text before fraction match
    if (match.index > lastIndex) {
      const subText = text.substring(lastIndex, match.index);
      parts.push(...formatText(subText, `pre-${lastIndex}`));
    }

    const [fullMatch, whole, num, den] = match;
    
    // Calculate font size for the fraction parts relative to current text
    const fontSize = `${0.85 * scale}em`;

    parts.push(
      <span key={`math-${match.index}`} className="inline-flex items-center align-middle mx-[0.3em] font-sans">
        {whole && <span className="mr-[0.3em] font-bold">{whole}</span>}
        <span className="inline-flex flex-col text-center justify-center" style={{ fontSize }}>
          {/* Numerator */}
          <span className="border-b-[2px] md:border-b-[3px] border-solid border-current px-[0.3em] pb-[0.1em] mb-[0.1em] font-bold block min-w-[1.2em] leading-tight">
            {num}
          </span>
          {/* Denominator */}
          <span className="px-[0.3em] pt-[0.1em] font-bold block min-w-[1.2em] leading-tight">
            {den}
          </span>
        </span>
      </span>
    );

    lastIndex = fractionRegex.lastIndex;
  }

  // Remaining text after last fraction
  if (lastIndex < text.length) {
    const subText = text.substring(lastIndex);
    parts.push(...formatText(subText, `post-${lastIndex}`));
  }

  return <span className={className}>{parts}</span>;
};

export default MathText;