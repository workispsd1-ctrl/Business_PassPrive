type LogoVariant = 'orange' | 'white' | 'light';

const glyphs: Record<LogoVariant, string> = {
  orange: '/figma/logo-glyph-home.svg',
  white: '/figma/about-logo-glyph.svg',
  light: '/figma/logo-glyph-mission.svg',
};

/**
 * Passprivé brand lockup from the Figma header: gradient tile + glyph + "Pass/privé" wordmark.
 * Sizes are expressed in the page design unit (--u) so it scales with the layout.
 */
export function PPLogo({ variant = 'orange', className = '' }: { variant?: LogoVariant; className?: string }) {
  return (
    <span className={`pp-logo pp-logo--${variant} ${className}`}>
      <span className="pp-logo__tile">
        <img src={glyphs[variant]} alt="" width={25.557} height={27.775} />
      </span>
      <span className="pp-logo__word">
        <span className="pp-logo__pass">Pass</span>
        <span className="pp-logo__prive">privé</span>
      </span>
    </span>
  );
}
