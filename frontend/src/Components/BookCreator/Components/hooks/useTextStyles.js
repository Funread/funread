import { useState, useCallback, useEffect, useMemo } from "react";
import { debounce, getContrastRatio } from "../shared/textUtils";

export function useTextStyles(initialStyles = {}) {
  const defaultStyles = {
    text: "Type your text here",
    fontFamily: "Arial, sans-serif",
    fontSize: 24,
    color: "#000000",
    fontStyle: "normal",
    backgroundColor: "transparent",
    lineHeight: 1.2,
    shadow: false,
    rotation: 0,
    opacity: 100,
    textAlign: "left",
    letterSpacing: 0,
    textDecoration: "none",
    ...initialStyles
  };

  const [textStyles, setTextStyles] = useState(defaultStyles);
  const [showContrastWarning, setShowContrastWarning] = useState(false);

  const updateStyle = useCallback((key, value) => {
    setTextStyles(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleBold = useCallback(() => {
    setTextStyles(prev => ({
      ...prev,
      fontStyle: prev.fontStyle.includes("bold")
        ? prev.fontStyle.replace("bold", "").trim() || "normal"
        : `${prev.fontStyle} bold`.trim()
    }));
  }, []);

  const toggleItalic = useCallback(() => {
    setTextStyles(prev => ({
      ...prev,
      fontStyle: prev.fontStyle.includes("italic")
        ? prev.fontStyle.replace("italic", "").trim() || "normal"
        : `${prev.fontStyle} italic`.trim()
    }));
  }, []);

  const toggleUnderline = useCallback(() => {
    setTextStyles(prev => ({
      ...prev,
      textDecoration: prev.textDecoration.includes("underline") ? "none" : "underline"
    }));
  }, []);

  const toggleStrike = useCallback(() => {
    setTextStyles(prev => ({
      ...prev,
      textDecoration: prev.textDecoration.includes("line-through") ? "none" : "line-through"
    }));
  }, []);

  const toggleShadow = useCallback(() => {
    setTextStyles(prev => ({ ...prev, shadow: !prev.shadow }));
  }, []);

  const checkContrast = useCallback(
    debounce(() => {
      if (textStyles.backgroundColor === "transparent") {
        setShowContrastWarning(false);
        return;
      }
      const ratio = getContrastRatio(textStyles.color, textStyles.backgroundColor);
      const minRatio = textStyles.fontSize >= 18 ? 3 : 4.5;
      setShowContrastWarning(ratio < minRatio);
    }, 300),
    [textStyles.color, textStyles.backgroundColor, textStyles.fontSize]
  );

  useEffect(() => {
    checkContrast();
  }, [textStyles.color, textStyles.backgroundColor, textStyles.fontSize, checkContrast]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            toggleBold();
            break;
          case 'i':
            e.preventDefault();
            toggleItalic();
            break;
          case 'u':
            e.preventDefault();
            toggleUnderline();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleBold, toggleItalic, toggleUnderline]);

  const resetStyles = useCallback(() => {
    setTextStyles({
      text: "Type your text here",
      fontFamily: "Arial, sans-serif",
      fontSize: 24,
      color: "#000000",
      fontStyle: "normal",
      backgroundColor: "transparent",
      lineHeight: 1.2,
      shadow: false,
      rotation: 0,
      opacity: 100,
      textAlign: "left",
      letterSpacing: 0,
      textDecoration: "none",
      ...initialStyles
    });
  }, [initialStyles]);

  const getCSSStyles = useCallback(() => ({
    fontSize: `${textStyles.fontSize}px`,
    color: textStyles.color,
    fontFamily: textStyles.fontFamily,
    fontStyle: textStyles.fontStyle.includes("italic") ? "italic" : "normal",
    fontWeight: textStyles.fontStyle.includes("bold") ? "bold" : "normal",
    textDecoration: textStyles.textDecoration,
    lineHeight: textStyles.lineHeight,
    textShadow: textStyles.shadow ? "2px 2px 4px rgba(0,0,0,0.5)" : "none",
    backgroundColor: textStyles.backgroundColor,
    transform: `rotate(${textStyles.rotation}deg)`,
    opacity: textStyles.opacity / 100,
    textAlign: textStyles.textAlign,
    letterSpacing: `${textStyles.letterSpacing}px`,
  }), [textStyles]);

  const getKonvaStyles = useCallback(() => {
    const isBold = textStyles.fontStyle.includes("bold");
    return {
      text: textStyles.text,
      fontSize: textStyles.fontSize,
      fontFamily: textStyles.fontFamily,
      fill: textStyles.color,
      fontStyle: textStyles.fontStyle.includes("italic") ? "italic" : "normal",
      fontWeight: isBold ? "bold" : "normal",
      lineHeight: textStyles.lineHeight,
      stroke: isBold ? textStyles.color : undefined,
      strokeWidth: isBold ? 0.6 : 0,
      rotation: textStyles.rotation,
      opacity: textStyles.opacity / 100,
      shadowColor: textStyles.shadow ? "rgba(0,0,0,0.5)" : undefined,
      shadowBlur: textStyles.shadow ? 4 : 0,
      shadowOffsetX: textStyles.shadow ? 2 : 0,
      shadowOffsetY: textStyles.shadow ? 2 : 0,
      backgroundColor: textStyles.backgroundColor !== "transparent" ? textStyles.backgroundColor : undefined,
      align: textStyles.textAlign,
      letterSpacing: textStyles.letterSpacing,
      textDecoration: textStyles.textDecoration,
    };
  }, [textStyles]);

  return {
    textStyles,
    updateStyle,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleStrike,
    toggleShadow,
    resetStyles,
    getCSSStyles,
    getKonvaStyles,
    showContrastWarning
  };
}
