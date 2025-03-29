import { Request, Response, NextFunction } from 'express';

// Block access to hidden files and directories
export const blockHiddenFiles = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  
  // Block access to hidden files and common sensitive paths
  if (
    path.includes('/.') || 
    path.includes('BitKeeper') || 
    path.match(/\/(\.git|\.svn|\.env|\.htaccess)/) ||
    // Block attempts to bypass 403 with URL encoding tricks
    path.includes('%20') ||
    path.includes('%2e') ||
    path.includes('%2f')
  ) {
    return res.status(403).send('Access Forbidden');
  }
  
  next();
};

// Implement proper 404 handling
export const handle404 = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send('Not Found');
  // No need to call next() as this is an endpoint handler
};



